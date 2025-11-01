/**
 * アプリケーション全体で使用するURLを一元管理
 */

// ============================================
// PassPal公式サイト関連
// ============================================
export const PASSPAL_URLS = {
    /** フィードバックフォーム */
    feedback: "https://chukyo-passpal.app/feedback",
    /** お問い合わせフォーム */
    contact: "https://chukyo-passpal.app/contact",
    /** 利用規約 */
    terms: "https://chukyo-passpal.app/term",
    /** プライバシーポリシー */
    privacy: "https://chukyo-passpal.app/policy",
} as const;

// ============================================
// アプリストア関連
// ============================================
export const STORE_URLS = {
    /** iOS App Store */
    ios: "https://apps.apple.com/app/passpal/id6754452343",
    /** Google Play Store */
    android: "https://play.google.com/store/apps/details?id=app.chukyopasspal.passpal",
} as const;

// ============================================
// 中京大学サービス関連
// ============================================

/** CUBICS（授業支援システム）関連URL */
export const CUBICS_URLS = {
    /** ベースURL */
    base: "https://cubics-as-out.mng.chukyo-u.ac.jp",
} as const;

/** Albo（ポータルサイト）関連URL */
export const ALBO_URLS = {
    /** ベースURL */
    base: "https://cubics-pt-out.mng.chukyo-u.ac.jp",
    /** ログインURL */
    login: "https://cubics-pt-out.mng.chukyo-u.ac.jp/uniprove_pt/UnLoginControl",
} as const;

/** MaNaBo（学習管理システム）関連URL */
export const MANABO_URLS = {
    /** ベースURL */
    base: "https://manabo.cnc.chukyo-u.ac.jp",
    /** Shibboleth認証URL */
    auth: "https://manabo.cnc.chukyo-u.ac.jp/auth/shibboleth/",
    /**
     * 授業ページURLを生成
     * @param classId - 授業ID
     * @returns 授業ページのURL
     */
    class: (classId: string) => `https://manabo.cnc.chukyo-u.ac.jp/class/${classId}/`,
} as const;

/** Shibboleth（認証システム）関連URL */
export const SHIBBOLETH_URLS = {
    /** ログインフォームURL */
    loginForm: "https://shib.chukyo-u.ac.jp/cloudlink/module.php/core/loginuserpass.php",
} as const;

// ============================================
// URLヘルパー関数
// ============================================

/**
 * プラットフォームに応じたアプリストアURLを取得
 * @param platform - "ios" または "android"
 * @returns アプリストアのURL
 */
export const getStoreUrl = (platform: "ios" | "android"): string => {
    return STORE_URLS[platform];
};

/**
 * MaNaBoの授業ページURLを取得
 * @param classId - 授業ID
 * @returns MaNaBoの授業ページURL
 */
export const getManaboClassUrl = (classId: string): string => {
    return MANABO_URLS.class(classId);
};

// ============================================
// 型定義
// ============================================

/** PassPal URLのキー */
export type PassPalUrlKey = keyof typeof PASSPAL_URLS;

/** ストアURLのキー */
export type StoreUrlKey = keyof typeof STORE_URLS;

/** CUBICS URLのキー */
export type CubicsUrlKey = keyof typeof CUBICS_URLS;

/** Albo URLのキー */
export type AlboUrlKey = keyof typeof ALBO_URLS;

/** MaNaBo URLのキー */
export type ManaboUrlKey = keyof typeof MANABO_URLS;

/** Shibboleth URLのキー */
export type ShibbolethUrlKey = keyof typeof SHIBBOLETH_URLS;
