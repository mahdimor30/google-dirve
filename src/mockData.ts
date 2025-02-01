import type { DriveItem } from "./types"

export const mockDriveData: DriveItem[] = [
  {
    id: "1",
    name: "Documents",
    type: "folder",
    children: [
      { id: "1-1", name: "Resume.pdf", type: "document", size: 1024 * 1024 }, // 1 MB
      { id: "1-2", name: "Project Proposal.docx", type: "document", size: 2.5 * 1024 * 1024 }, // 2.5 MB
    ],
  },
  {
    id: "2",
    name: "Images",
    type: "folder",
    children: [
      { id: "2-1", name: "Vacation.jpg", type: "image", size: 3 * 1024 * 1024 }, // 3 MB
      { id: "2-2", name: "Family.png", type: "image", size: 5 * 1024 * 1024 }, // 5 MB
    ],
  },
  { id: "3", name: "Budget.xlsx", type: "document", size: 512 * 1024 }, // 512 KB
  { id: "4", name: "Presentation.pptx", type: "document", size: 4 * 1024 * 1024 }, // 4 MB
  {
    id: "5",
    name: "Videos",
    type: "folder",
    children: [
      { id: "5-1", name: "Tutorial.mp4", type: "video", size: 100 * 1024 * 1024 }, // 100 MB
    ],
  },
]

