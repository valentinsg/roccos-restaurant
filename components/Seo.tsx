// components/Seo.tsx
import Head from "next/head"

type SeoProps = {
  title: string
  description: string
  url: string
  image?: string
  canonical?: string
  type?: string
  restaurantSchema?: object
}

export default function Seo({
  title,
  description,
  url,
  image = "/og-image.jpg",
  canonical,
  type = "website",
  restaurantSchema,
}: SeoProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="restaurante, pizza, café, Dolores, Buenos Aires, comida italiana, fast food, coffee" />
      <meta name="author" content="Rocco's" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Rocco's Restaurante" />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="es_AR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Structured Data */}
      {restaurantSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
      )}
    </Head>
  )
}
