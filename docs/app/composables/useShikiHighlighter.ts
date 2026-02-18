import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import type { HighlighterCore } from 'shiki/core'

let _promise: Promise<HighlighterCore> | null = null

function getHighlighter(): Promise<HighlighterCore> {
    return (_promise ??= createHighlighterCore({
        engine: createJavaScriptRegexEngine(),
        themes: [
            import('@shikijs/themes/material-theme-darker'),
            import('@shikijs/themes/material-theme-lighter'),
        ],
        langs: [
            import('@shikijs/langs/vue'),
        ],
    }))
}

export default function useShikiHighlighter() {
    const highlight = async (code: string): Promise<string> => {
        if (!code) return ''
        const hl = await getHighlighter()
        return hl.codeToHtml(code, {
            lang: 'vue',
            themes: {
                light: 'material-theme-lighter',
                dark: 'material-theme-darker',
            },
            transformers: [
                {
                    pre(node) {
                        node.properties.style = `${node.properties.style ?? ''};margin:0;padding:1rem 1.25rem;overflow-x:auto`
                    },
                    code(node) {
                        node.children = node.children.filter(
                            (child) => !(child.type === 'text' && child.value === '\n'),
                        )
                    },
                },
            ],
        })
    }

    return { highlight }
}
