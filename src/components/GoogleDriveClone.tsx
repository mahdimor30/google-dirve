'use client'
import React, { useState } from "react";
import type { DriveItem, BreadcrumbItem } from "../types";
import { mockDriveData } from "../mockData";
import {
  FileIcon,
  FolderIcon,
  ImageIcon,
  VideoIcon,
  FileAudioIcon as AudioIcon,
  Upload,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";



const GoogleDriveClone: React.FC = () => {
  const [currentFolder, setCurrentFolder] = useState<DriveItem[]>(mockDriveData)
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([{ id: "root", name: "My Drive" }])

  const handleUpload = () => {
    alert("Upload functionality would be implemented here")
  }

  const navigateToFolder = (item: DriveItem) => {
    if (item.type === "folder" && item.children) {
      setCurrentFolder(item.children)
      setBreadcrumbs([...breadcrumbs, { id: item.id, name: item.name }])
    }
  }

  const navigateToBreadcrumb = (breadcrumb: BreadcrumbItem) => {
    const index = breadcrumbs.findIndex((b) => b.id === breadcrumb.id)
    if (index !== -1) {
      const newBreadcrumbs = breadcrumbs.slice(0, index + 1)
      setBreadcrumbs(newBreadcrumbs)

      if (breadcrumb.id === "root") {
        setCurrentFolder(mockDriveData)
      } else {
        // This is a simplified navigation. In a real app, you'd need to traverse the folder structure.
        const folder = mockDriveData.find((item) => item.id === breadcrumb.id)
        if (folder && folder.children) {
          setCurrentFolder(folder.children)
        }
      }
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Google Drive Clone</h1>
        <Button onClick={handleUpload} className="flex items-center gap-2">
          <Upload size={16} />
          Upload
        </Button>
      </div>
      <Breadcrumbs items={breadcrumbs} onNavigate={navigateToBreadcrumb} />
      <DriveItemList items={currentFolder} onNavigate={navigateToFolder} />
    </div>
  )
}

const Breadcrumbs: React.FC<{ items: BreadcrumbItem[]; onNavigate: (item: BreadcrumbItem) => void }> = ({
  items,
  onNavigate,
}) => {
  return (
    <div className="flex items-center space-x-2 mb-4">
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          {index > 0 && <ChevronRight size={16} />}
          <button onClick={() => onNavigate(item)} className="hover:underline focus:outline-none">
            {item.name}
          </button>
        </React.Fragment>
      ))}
    </div>
  )
}

const DriveItemList: React.FC<{ items: DriveItem[]; onNavigate: (item: DriveItem) => void }> = ({
  items,
  onNavigate,
}) => {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-12 gap-4 py-2 px-4 bg-gray-800 rounded-t-lg">
        <div className="col-span-6">Name</div>
        <div className="col-span-3">Type</div>
        <div className="col-span-3">Size</div>
      </div>
      {items.map((item) => (
        <DriveItemComponent key={item.id} item={item} onNavigate={onNavigate} />
      ))}
    </div>
  )
}

const DriveItemComponent: React.FC<{ item: DriveItem; onNavigate: (item: DriveItem) => void }> = ({
  item,
  onNavigate,
}) => {
  const getIcon = () => {
    switch (item.type) {
      case "folder":
        return <FolderIcon className="w-5 h-5 text-yellow-500" />
      case "document":
        return <FileIcon className="w-5 h-5 text-blue-500" />
      case "image":
        return <ImageIcon className="w-5 h-5 text-green-500" />
      case "video":
        return <VideoIcon className="w-5 h-5 text-red-500" />
      case "audio":
        return <AudioIcon className="w-5 h-5 text-purple-500" />
    }
  }

  const formatSize = (bytes?: number): string => {
    if (bytes === undefined) return "N/A"
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    if (bytes === 0) return "0 Byte"
    const i = Number.parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString())
    return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i]
  }

  return (
    <div
      className="grid grid-cols-12 gap-4 items-center p-2 hover:bg-gray-700 cursor-pointer rounded-lg"
      onClick={() => onNavigate(item)}
    >
      <div className="col-span-6 flex items-center gap-2">
        {getIcon()}
        <span>{item.name}</span>
      </div>
      <div className="col-span-3 capitalize">{item.type}</div>
      <div className="col-span-3">{formatSize(item.size)}</div>
    </div>
  )
}

export default GoogleDriveClone

