import { promises as fs } from "fs";
import path from "path";

interface LicenseCheckerEntry {
    licenses?: string;
    licenseFile?: string;
}

interface LicenseEntry {
    packageName: string;
    licenseType: string;
    licenseText: string;
}

const REPO_ROOT = path.resolve(__dirname, "..");
const LICENSE_JSON_PATH = path.join(REPO_ROOT, "licenses.json");
const LICENSE_DATA_PATH = path.join(REPO_ROOT, "assets", "data", "licenseEntries.json");

const escapeForJson = (value: string): string => {
    return value.replace(/\r\n/g, "\n").trim();
};

const readLicenseEntries = async (data: Record<string, LicenseCheckerEntry>): Promise<LicenseEntry[]> => {
    const entries: LicenseEntry[] = [];

    for (const [packageName, info] of Object.entries(data)) {
        if (!info.licenseFile) {
            console.warn(`[license-generator] Skipping ${packageName}: no licenseFile path.`);
            continue;
        }

        try {
            const licenseText = await fs.readFile(info.licenseFile, "utf-8");
            entries.push({
                packageName,
                licenseType: info.licenses ?? "UNKNOWN",
                licenseText: escapeForJson(licenseText),
            });
        } catch (error) {
            console.warn(`[license-generator] Failed to read license for ${packageName}: ${(error as Error).message}`);
        }
    }

    return entries.sort((a, b) => a.packageName.localeCompare(b.packageName));
};

const ensureLicenseJsonExists = async () => {
    try {
        await fs.access(LICENSE_JSON_PATH);
    } catch {
        throw new Error(
            `licenses.json not found at ${LICENSE_JSON_PATH}. ` +
                "Run `bun run license-checker --production --direct --json --out ./licenses.json` first.",
        );
    }
};

const writeLicenseJson = async (entries: LicenseEntry[]) => {
    await fs.mkdir(path.dirname(LICENSE_DATA_PATH), { recursive: true });
    await fs.writeFile(LICENSE_DATA_PATH, JSON.stringify(entries, null, 4), "utf-8");
    console.log(`[license-generator] Wrote ${LICENSE_DATA_PATH}`);
};

const main = async () => {
    await ensureLicenseJsonExists();

    const rawJson = await fs.readFile(LICENSE_JSON_PATH, "utf-8");
    const parsed = JSON.parse(rawJson) as Record<string, LicenseCheckerEntry>;

    const licenseEntries = await readLicenseEntries(parsed);

    if (licenseEntries.length === 0) {
        console.warn("[license-generator] No license entries were generated.");
    }

    await writeLicenseJson(licenseEntries);
};

main().catch((error) => {
    console.error("[license-generator] Failed to generate License.tsx");
    console.error(error);
    process.exitCode = 1;
});
