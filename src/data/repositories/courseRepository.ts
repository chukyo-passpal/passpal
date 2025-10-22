import * as parser from "@chukyo-passpal/web_parser";
import { ParseError } from "../errors/ParseError";
import { classDirectoryToDomain, classNewsToDomain, courseSyllabusToDomain, entryToDomain, manaboContentToDomain } from "../mappers/courseMapper";
import manaboProviderInstance, { ManaboProvider } from "../providers/chukyo-univ/manaboProvider";

export class CourseRepository {
    private readonly manaboProvider: ManaboProvider;

    /**
     * リポジトリを初期化します。
     * @param manaboProvider Manaboプロバイダーの差し替え用インスタンス
     */
    constructor({ manaboProvider = manaboProviderInstance }: { manaboProvider?: ManaboProvider } = {}) {
        this.manaboProvider = manaboProvider;
    }

    /**
     * 指定した授業のお知らせ一覧を取得します。
     * @param classId 授業ID
     * @param directoryId ディレクトリID（初期値は`0`）
     * @returns ドメイン変換済みのお知らせデータ
     * @throws ParseError 解析に失敗した場合
     */
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

    /**
     * 指定授業のシラバス情報を取得します。
     * @param classId 授業ID
     * @returns ドメイン変換済みのシラバスデータ
     * @throws ParseError 解析に失敗した場合
     */
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

    /**
     * 授業の出席状況を取得します。
     * @param classId 授業ID
     * @returns ドメイン変換済みの出席情報
     * @throws ParseError 解析に失敗した場合
     */
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

    /**
     * 授業内のコンテンツディレクトリ一覧を取得します。
     * @param classId 授業ID
     * @param directoryId ディレクトリID（初期値は`0`）
     * @returns ドメイン変換済みのディレクトリ情報
     * @throws ParseError 解析に失敗した場合
     */
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

    /**
     * 授業の教材コンテンツを取得します。
     * @param classId 授業ID
     * @param directoryId ディレクトリID
     * @param viewType 取得する表示モード（任意）
     * @returns ドメイン変換済みのコンテンツ情報
     * @throws ParseError 解析に失敗した場合
     */
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
            return manaboContentToDomain(dto.data);
        } else {
            throw new ParseError({ cause: dto.error });
        }
    }

    /**
     * 指定授業に出席フォームが存在するか確認します。
     * @param classId 授業ID
     * @returns 出席フォーム有無を示す解析結果
     * @throws ParseError 解析に失敗した場合
     */
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

    /**
     * 指定授業の出席フォーム詳細を取得します。
     * @param classId 授業ID
     * @returns 出席フォームの解析結果
     * @throws ParseError 解析に失敗した場合
     */
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

    /**
     * 出席フォームを送信して出席登録を行います。
     * @param classId 授業ID
     * @param directoryId ディレクトリID
     * @param entryId 出席ID
     * @param uniqueId 一意識別子
     * @returns 出席送信の結果オブジェクト
     * @throws ParseError 解析に失敗した場合
     */
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
