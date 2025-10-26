import { ManaboContentData } from "./class";

type ClassId = string;
type DirectoryId = string;

export interface AssignmentDirectoryData {
    directoryId: DirectoryId;
    directoryName: string;
    contents: ManaboContentData[];
}

export interface AssignmentClassData {
    classId: ClassId;
    className: string;
    directories: Record<DirectoryId, AssignmentDirectoryData>;
}

export interface AssignmentInfo {
    classes: Record<ClassId, AssignmentClassData>;
}
