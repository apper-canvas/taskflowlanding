import React from "react"
import { motion } from "framer-motion"

const Loading = () => {
  return (
    <div className="space-y-4 p-6">
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse flex-shrink-0 mt-1" />
            
            <div className="flex-1 space-y-3">
              <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                <div className="h-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded animate-pulse w-3/4" />
              </div>
              
              <div className="flex items-center gap-2">
                <div className="h-6 w-16 bg-gradient-to-r from-primary-100 to-primary-200 rounded-full animate-pulse" />
                <div className="h-6 w-20 bg-gradient-to-r from-accent-100 to-accent-200 rounded-full animate-pulse" />
                <div className="h-6 w-14 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default Loading