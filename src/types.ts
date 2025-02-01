export type FileType = "folder" | "document" | "image" | "video" | "audio"

export interface DriveItem {
  id: string
  name: string
  type: FileType
  size?: number // Size in bytes
  children?: DriveItem[]
}

export interface BreadcrumbItem {
  id: string
  name: string
}

