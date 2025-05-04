// 📁 lib/sanity.ts
import { createClient } from '@sanity/client'

export const sanity = createClient({
  projectId: 'v7eypfph',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true // activamos CDN porque estás haciendo solo fetch público
})