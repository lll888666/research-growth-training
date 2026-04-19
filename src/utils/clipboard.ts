export async function copyText(text: string): Promise<{ ok: boolean; message: string }> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return { ok: true, message: '结果 JSON 已复制。' }
    }

    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.select()

    const success = document.execCommand('copy')
    document.body.removeChild(textarea)

    if (success) {
      return { ok: true, message: '结果 JSON 已复制。' }
    }

    return { ok: false, message: '复制失败，请手动复制结果 JSON。' }
  } catch {
    return { ok: false, message: '复制失败，请手动复制结果 JSON。' }
  }
}
