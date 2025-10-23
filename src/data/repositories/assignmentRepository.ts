import * as parser from "@chukyo-passpal/web_parser";
import { ParseError } from "../errors/ParseError";
import manaboProviderInstance, { ManaboProvider } from "../providers/chukyo-univ/manaboProvider";

export interface AssignmentRepository {
    /**
     * クイズ結果をManaboから取得します。
     * @param pluginId プラグインID
     * @param classId 授業ID
     * @param id クイズID
     * @param directoryId ディレクトリID
     * @param attendId 出席ID
     * @param result 結果種別（初期値は`0`）
     * @param page ページ番号（初期値は0）
     * @returns クイズ結果のドメインデータ
     * @throws ParseError 解析に失敗した場合
     */
    getClassQuizResult(
        pluginId: string,
        classId: string,
        id: string,
        directoryId: string,
        attendId: string,
        result?: string,
        page?: number
    ): Promise<parser.ManaboClassQuizResultDTO>;
}

export class IntegratedAssignmentRepository implements AssignmentRepository {
    private readonly manaboProvider: ManaboProvider;

    /**
     * リポジトリを初期化します。
     * @param manaboProvider Manaboプロバイダーの差し替え用インスタンス
     */
    constructor({ manaboProvider = manaboProviderInstance }: { manaboProvider?: ManaboProvider } = {}) {
        this.manaboProvider = manaboProvider;
    }

    public async getClassQuizResult(
        pluginId: string,
        classId: string,
        id: string,
        directoryId: string,
        attendId: string,
        result: string = "0",
        page: number = 0
    ) {
        const response = await this.manaboProvider.get(
            `/?plugin_id=${pluginId}&classId=${classId}&id=${id}&directory_id=${directoryId}&attend_id=${attendId}&result=${result}&p=${page}&action=plugin_quiz_ajax_result_list&_=${Date.now()}`
        );
        const dto = parser.parseManaboClassQuizResult(response);
        if (dto.success) {
            return dto.data;
        } else {
            throw new ParseError({ cause: dto.error });
        }
    }
}

const assignmentRepositoryInstance = new IntegratedAssignmentRepository();
export default assignmentRepositoryInstance;
