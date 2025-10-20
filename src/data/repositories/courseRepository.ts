import * as parser from "@chukyo-passpal/web_parser";
import { ParseError } from "../errors/ParseError";
import { classDirectoryToDomain, classNewsToDomain, courseSyllabusToDomain, entryToDomain } from "../mappers/courseMapper";
import manaboProviderInstance, { ManaboProvider } from "../providers/chukyo-univ/manaboProvider";

export class CourseRepository {
    private readonly manaboProvider: ManaboProvider;

    constructor({ manaboProvider = manaboProviderInstance }: { manaboProvider?: ManaboProvider } = {}) {
        this.manaboProvider = manaboProvider;
    }

    // クラスお知らせ取得
    public async getClassNews(classId: string, directoryId: string = "0") {
        const response = await this.manaboProvider.post(
            "/",
            "application/x-www-form-urlencoded",
            new URLSearchParams({
                class_id: classId,
                directory_id: directoryId,
                action: "glexa_ajax_class_news_list",
            })
        );
        const dto = parser.parseManaboClassNews(response);
        if (dto.success) {
            return classNewsToDomain(dto.data);
        } else {
            throw new ParseError({ cause: dto.error });
        }
    }

    // シラバス取得
    public async getClassSyllabus(classId: string) {
        const response = await this.manaboProvider.post(
            "/",
            "application/x-www-form-urlencoded",
            new URLSearchParams({
                class_id: classId,
                action: "glexa_ajax_class_syllabus_view",
            })
        );
        const dto = parser.parseManaboClassSyllabus(response);
        if (dto.success) {
            return courseSyllabusToDomain(dto.data);
        } else {
            throw new ParseError({ cause: dto.error });
        }
    }

    // クラス出席情報取得
    public async getClassEntry(classId: string) {
        const response = await this.manaboProvider.post(
            "/",
            "application/x-www-form-urlencoded",
            new URLSearchParams({
                class_id: classId,
                action: "glexa_modal_entry_view",
            })
        );
        const dto = parser.parseManaboClassEntry(response);
        if (dto.success) {
            return entryToDomain(dto.data);
        } else {
            throw new ParseError({ cause: dto.error });
        }
    }

    // クラスディレクトリ取得
    public async getClassDirectory(classId: string, directoryId: string = "0") {
        const response = await this.manaboProvider.post(
            "/",
            "application/x-www-form-urlencoded",
            new URLSearchParams({
                class_id: classId,
                directory_id: directoryId,
                action: "glexa_ajax_class_directory_list",
            })
        );

        const dto = parser.parseManaboClassDirectory(response);
        if (dto.success) {
            return classDirectoryToDomain(dto.data);
        } else {
            throw new ParseError({ cause: dto.error });
        }
    }

    // クラスコンテンツ取得
    public async getClassContent(classId: string, directoryId: string, viewType?: string) {
        let searchParams = new URLSearchParams({
            class_id: classId,
            directory_id: directoryId,
            action: "glexa_ajax_class_content_list",
        });

        if (viewType) {
            searchParams.append("view_type", viewType);
        }

        const response = await this.manaboProvider.post("/", "application/x-www-form-urlencoded", searchParams);
        const dto = parser.parseManaboClassContent(response);
        if (dto.success) {
            return dto.data;
        } else {
            throw new ParseError({ cause: dto.error });
        }
    }

    // 出席があるかどうか確認
    public async getEntryExist(classId: string) {
        const response = await this.manaboProvider.post(
            "/",
            "application/x-www-form-urlencoded",
            new URLSearchParams({
                class_id: classId,
                is_ajax: "1",
                action: "glexa_modal_entry_form",
            })
        );
        const dto = parser.parseManaboEntryResponse(response);
        if (dto.success) {
            // TODO: domain形にmapする
            return dto.data;
        } else {
            throw new ParseError({ cause: dto.error });
        }
    }

    // 出席フォーム情報取得
    public async getEntryForm(classId: string) {
        const response = await this.manaboProvider.get(`/?class_id=${classId}&action=glexa_modal_entry_form&_=${Date.now()}`);
        const dto = parser.parseManaboEntryForm(response);
        if (dto.success) {
            // TODO: domain形にmapする
            return dto.data;
        } else {
            throw new ParseError({ cause: dto.error });
        }
    }

    // 出席登録
    public async submitEntry(classId: string, directoryId: string, entryId: string, uniqueId: string) {
        const response = await this.manaboProvider.get(
            `/?action=glexa_modal_entry_form_accept&class_id=${classId}&directory_id=${directoryId}&entry_id=${entryId}&uniqid=${uniqueId}&_=${Date.now()}`
        );
        const dto = parser.parseManaboEntryResponse(response);
        if (dto.success) {
            // TODO: domain形にmapする
            return dto.data;
        } else {
            throw new ParseError({ cause: dto.error });
        }
    }
}

const courseRepositoryInstance = new CourseRepository();
export default courseRepositoryInstance;
