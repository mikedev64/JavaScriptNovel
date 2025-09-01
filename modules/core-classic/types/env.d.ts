// Tipos para detección de entorno

export interface ImportMetaEnv {
  readonly DEV?: boolean
  readonly PROD?: boolean
  readonly MODE?: string
}

export interface ImportMeta {
  readonly env?: ImportMetaEnv
}
