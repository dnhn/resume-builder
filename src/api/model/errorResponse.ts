/**
 * Generated by orval v6.17.0 🍺
 * Do not edit manually.
 * FE-23 OpenAI API
 * OpenAPI spec version: 1.0.0
 */
import type { ErrorDetail } from './errorDetail'

export interface ErrorResponse {
  code: string
  error: string
  traceId: string
  errors?: ErrorDetail[]
}
