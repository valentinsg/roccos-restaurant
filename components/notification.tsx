"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, Info, X } from "lucide-react"

type NotificationType = "success" | "error" | "info"

interface NotificationProps {
  type: NotificationType
  message: string
  visible: boolean
  onCloseAction: () => void
  autoHideDuration?: number
}

export default function Notification({
  type = "info",
  message,
  visible,
  onCloseAction,
  autoHideDuration = 3000,
}: NotificationProps) {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (visible && autoHideDuration) {
      timeoutId = setTimeout(() => {
        onCloseAction()
      }, autoHideDuration)
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [visible, autoHideDuration, onCloseAction])

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200"
      case "error":
        return "bg-red-50 border-red-200"
      case "info":
        return "bg-blue-50 border-blue-200"
      default:
        return "bg-blue-50 border-blue-200"
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-24 left-1/4 transform -translate-x-1/2 z-999 max-w-sm w-full"
        >
          <div
            className={`rounded-lg shadow-lg border px-4 py-3 ${getBackgroundColor()} font-outfit flex items-center justify-between`}
          >
            <div className="flex items-center space-x-3">
              {getIcon()}
              <p className="text-gray-700">{message}</p>
            </div>
            <button
              onClick={onCloseAction}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Cerrar notificación"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Crear un contexto y hook para manejar notificaciones globalmente
import { createContext, useContext, ReactNode } from "react"

interface NotificationContextProps {
  showNotification: (type: NotificationType, message: string, duration?: number) => void
  hideNotification: () => void
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notificationState, setNotificationState] = useState({
    visible: false,
    type: "info" as NotificationType,
    message: "",
    duration: 3000,
  })

  const showNotification = (type: NotificationType, message: string, duration = 3000) => {
    setNotificationState({
      visible: true,
      type,
      message,
      duration,
    })
  }

  const hideNotification = () => {
    setNotificationState((prev) => ({ ...prev, visible: false }))
  }

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
      {children}
      <Notification
        visible={notificationState.visible}
        type={notificationState.type}
        message={notificationState.message}
        onCloseAction={hideNotification}
        autoHideDuration={notificationState.duration}
      />
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
} 