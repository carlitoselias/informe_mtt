document.addEventListener('DOMContentLoaded', () => {

    const TEXTO_CERRADO = 'Haz clic para ver más'
    const TEXTO_ABIERTO = 'Haz clic para ocultar'

    // 1. Generar barra lateral
    const summaries = document.querySelectorAll('details.bloque-colapsable > summary')
    const barra = document.createElement('div')
    barra.id = 'barra-lateral'

    summaries.forEach((summary, i) => {
        let titulo = 'Sección ' + (i + 1)
        const prev = summary.closest('details').previousElementSibling
        if (prev && /^H[1-6]$/.test(prev.tagName)) {
            titulo = prev.textContent.trim()
        }

        if (!summary.id) {
            summary.id = 'seccion-' + (i + 1)
        }

        const a = document.createElement('a')
        a.href = `#${summary.id}`
        a.textContent = titulo
        barra.appendChild(a)
    })

    document.body.appendChild(barra)

    // 2. Lógica de acordeón y scroll
    const detalles = document.querySelectorAll('details.bloque-colapsable')
    detalles.forEach(det => {
        const summary = det.querySelector('summary')
        summary.textContent = det.open ? TEXTO_ABIERTO : TEXTO_CERRADO

        // Scroll también cuando se hace clic en summary directamente
        summary.addEventListener('click', () => {
            // Esperar que toggle ocurra, luego scroll si se abrió
            setTimeout(() => {
                if (det.open) {
                    det.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
            }, 150)
        })

        det.addEventListener('toggle', () => {
            summary.textContent = det.open ? TEXTO_ABIERTO : TEXTO_CERRADO

            if (det.open) {
                detalles.forEach(otro => {
                    if (otro !== det) {
                        otro.removeAttribute('open')
                        const sum = otro.querySelector('summary')
                        if (sum) sum.textContent = TEXTO_CERRADO
                    }
                })
            }
        })
    })

    // 3. Highlight visual al usar la barra lateral
    document.querySelectorAll('#barra-lateral a').forEach(a => {
        a.addEventListener('click', () => {
            setTimeout(() => {
                const id = a.getAttribute('href').substring(1)
                const summary = document.getElementById(id)
                if (summary) {
                    summary.classList.add('summary-highlight')
                    setTimeout(() => {
                        summary.classList.remove('summary-highlight')
                    }, 2000)
                }
            }, 100)
        })
    })
})
