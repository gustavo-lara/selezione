# Guia de Estilo do Frontend (Design System)

Este documento descreve as diretrizes de design e estilização adotadas no frontend do projeto. Ele foi baseado na identidade visual da landing page e deve ser seguido por agentes de IA e desenvolvedores para garantir a consistência visual em toda a aplicação.

## Estratégia de CSS

O projeto utiliza **Vanilla CSS** com uma abordagem modular. Os estilos não utilizam frameworks como Tailwind ou Bootstrap. Todas as regras globais e variáveis estão organizadas na pasta `/client/src/styles/`:

*   **`variables.css`**: Define a paleta de cores, tipografia, sombras e bordas (CSS Custom Properties).
*   **`global.css`**: Estilos de reset e configurações base do documento.
*   **`typography.css`**: Regras e utilitários para textos e cabeçalhos.
*   **`animations.css`**: Transições e animações da interface.
*   **`buttons.css`**: Estilos padronizados para botões e links interativos.
*   **`components.css`**: Estilos genéricos e utilitários para componentes reutilizáveis.
*   **`responsive.css`**: Breakpoints e regras de adaptação para diferentes tamanhos de tela.

O arquivo principal `/client/src/index.css` apenas importa esses módulos. Em componentes específicos, importe seus próprios arquivos `.css` ou utilize classes definidas nesses módulos globais.

## Identidade Visual e Paleta de Cores

O design busca uma estética elegante, focada em fotografia e estúdio, utilizando um contraste de "Papel e Tinta" com toques vintage/analógicos:

*   **Fundos (Paper):** 
    *   `--color-paper` (#F7F5F0) - Fundo principal, tom de papel/creme.
    *   `--color-paper-muted` (#EFECE6) - Fundo secundário.
*   **Textos (Ink):** 
    *   `--color-ink` (#1A1815) - Cor principal do texto (quase preto).
    *   `--color-ink-muted` (#3D3935) - Textos secundários ou de menor destaque.
*   **Destaques (Mark Red & Film Beige):** 
    *   `--color-mark-red` (#8A1810) - Cor de destaque principal (botões, links ativos, ênfases). Variações: `-hover`, `-deep`, `-light`.
    *   `--color-film-beige` (#D4C9A8) - Destaque secundário e sutil.
*   **Bordas e Linhas (Warm Grey):** 
    *   `--color-warm-grey` (#8A8578) e `--color-warm-grey-light` (#D9D5CC).

## Tipografia

O projeto faz uso de três famílias de fontes do Google Fonts para criar uma hierarquia clara e elegante:

1.  **Serif (`--font-serif`):** `Fraunces` - Utilizada em títulos (Headings) e elementos que exigem elegância.
2.  **Sans-serif (`--font-sans`):** `Plus Jakarta Sans` - Utilizada em parágrafos, textos de corpo (Body) e interface geral para máxima legibilidade.
3.  **Monospace (`--font-mono`):** `IBM Plex Mono` - Utilizada em dados técnicos, metadados, ou pequenos detalhes de design.

## Regras para Agentes de IA

1.  **Não utilize TailwindCSS ou frameworks externos:** Mantenha-se no CSS puro (Vanilla CSS).
2.  **Sempre utilize as variáveis CSS:** Ao definir cores, fontes ou sombras, **nunca** use valores hexadecimais soltos (ex: `color: #000;`). Utilize sempre as variáveis de `variables.css` (ex: `color: var(--color-ink);`).
3.  **Respeite a Identidade Visual:** A estética é premium, limpa e com ar de galeria de arte/fotografia. Evite cores genéricas que quebrem o padrão de "Papel e Tinta".
4.  **Criação de novos estilos:** Se um componente precisa de estilos muito específicos e complexos, crie um arquivo `.css` próprio para ele e importe-o no componente `.jsx`. Para estilos reaproveitáveis, adicione aos arquivos globais em `/styles/`.
5.  **Opacidade e Transparência:** Nunca utilize `rgba()` com cores hardcoded para criar sombras ou elementos transparentes. Para aplicar opacidade em uma variável do sistema, utilize a função nativa `color-mix`. Exemplo: `color-mix(in srgb, var(--color-paper) 50%, transparent)`.
