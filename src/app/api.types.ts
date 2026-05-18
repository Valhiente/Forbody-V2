/**rm -rf legacy_html dist build out .next
 * 
 * RESPONSE CONTRACT UNIVERSAL (ForBody OS)
 * Padroniza o retorno de todas as Server Actions para o Front-end.
 * Essencial para Logs, Analytics e Toast Systems.
 */
export type ActionResponse<T = any> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
};