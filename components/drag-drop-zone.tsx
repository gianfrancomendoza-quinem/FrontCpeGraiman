'use client'

import { useState, useCallback } from 'react'
import { Upload, X } from 'lucide-react'

interface DragDropZoneProps {
  onFilesDrop?: (files: File[]) => void
  accept?: string
  maxFiles?: number
  className?: string
}

export function DragDropZone({
  onFilesDrop,
  accept = '.pdf',
  maxFiles = 10,
  className = '',
}: DragDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  const handleDragEnter = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(true)
    },
    []
  )

  const handleDragLeave = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
    },
    []
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const droppedFiles = Array.from(e.dataTransfer.files).slice(0, maxFiles)
      setFiles(droppedFiles)
      onFilesDrop?.(droppedFiles)
    },
    [maxFiles, onFilesDrop]
  )

  const handleFileRemove = (index: number) => {
    const updated = files.filter((_, i) => i !== index)
    setFiles(updated)
  }

  return (
    <div className={className}>
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`glass rounded-xl p-8 text-center transition-all cursor-pointer ${
          isDragging ? 'bg-white/15 border-emerald-400/50' : 'border-white/10'
        }`}
      >
        <Upload className="w-12 h-12 mx-auto mb-4 text-emerald-400 opacity-70" />
        <h3 className="text-lg font-semibold text-slate-50 mb-2">
          Arrastra tus PDFs aquí
        </h3>
        <p className="text-sm text-slate-400">
          O haz clic para seleccionar archivos
        </p>
        <p className="text-xs text-slate-500 mt-2">
          Máximo {maxFiles} archivos, formato PDF
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-slate-300">
            Archivos seleccionados ({files.length})
          </h4>
          {files.map((file, idx) => (
            <div
              key={idx}
              className="glass rounded-lg p-3 flex items-center justify-between"
            >
              <span className="text-sm text-slate-300">{file.name}</span>
              <button
                onClick={() => handleFileRemove(idx)}
                className="p-1 hover:bg-red-400/20 rounded transition-colors"
              >
                <X className="w-4 h-4 text-red-400" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
