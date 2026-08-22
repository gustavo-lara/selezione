# Propostas para o Modelo Freemium (Fotógrafo)

Abaixo estão detalhadas as diretrizes iniciais para a evolução da plataforma rumo ao modelo SaaS Freemium, focando primeiramente nos limites aplicáveis ao Fotógrafo.

## 1. Limite por Armazenamento Total (Cota do Plano e Distribuição)
A métrica principal de restrição será o **espaço total em disco disponibilizado pelo plano** (ex: 3GB no plano free). A grande diferença aqui é a mecânica de gestão: o armazenamento total pertence à conta, mas o fotógrafo poderá (e deverá) **distribuir essa cota manualmente entre suas galerias**. 
Por exemplo, se ele possui 3GB totais, ele pode criar uma galeria para um casamento e alocar 2GB exclusivamente para ela, deixando 1GB livre para distribuir em outros ensaios menores. Isso permite um microgerenciamento eficiente do espaço e dá ao fotógrafo controle total sobre onde investir seus recursos, facilitando a visualização de quando é o momento exato de fazer o upgrade de plano.

## 2. Fim do Limite de Tamanho por Arquivo (Upload Ilimitado)
Como a barreira do plano passa a ser o armazenamento total da conta, o limite fixo de 25MB por foto será removido. O sistema deixará de barrar uploads pesados individualmente, permitindo que o fotógrafo suba arquivos de altíssima resolução, ou futuramente, arquivos de vídeo. A única trava durante o upload será a verificação contínua se o tamanho do arquivo que está sendo enviado, somado ao que já existe, não ultrapassa a cota máxima contratada ou do plano gratuito.

## 3. Tempo de Vida (TTL) Infinito Inicialmente
As galerias permanecerão sem uma data de expiração obrigatória (tempo de vida infinito) nesta primeira fase. Considerando a utilização do Azure em produção, o custo de manter galerias inativas não é um ofensor crítico neste momento inicial de aquisição de usuários. Ao atrelar a rentabilidade estritamente ao consumo de armazenamento (Storage), se o usuário atingir o limite e não quiser pagar o upgrade, caberá a ele próprio o trabalho de excluir galerias antigas para liberar espaço para novos trabalhos, criando um ciclo natural de autogestão.

## 4. Controle de Visibilidade da Galeria (Disponível / Privada)
No dashboard, o fotógrafo terá um controle direto (um *toggle*) sobre o status de acesso de cada galeria. Ao definir como "Disponível", o link público fica ativo e o cliente pode acessar e selecionar as fotos normalmente. Ao alterar para "Privada", o link público é desativado imediatamente, bloqueando qualquer acesso externo (retornando erro ou página de "galeria indisponível"). Isso dá autonomia para o fotógrafo "fechar" o trabalho após a escolha do cliente, sem precisar excluir a galeria para impedir o acesso.

## 5. Privacidade Flexível (Pública ou Protegida por Senha)
Para garantir a segurança das fotos sem adicionar a fricção de exigir um cadastro obrigatório para o cliente final (visualizador), o fotógrafo terá a opção de adicionar uma **senha de acesso** à galeria. Ele poderá manter a galeria 100% pública (acessível apenas por quem tem o link direto) ou habilitar a proteção por senha. Se a senha for ativada, o cliente que abrir o link verá apenas uma tela de bloqueio solicitando a credencial antes de visualizar qualquer conteúdo.

## 6. Ferramentas de Exportação e Produtividade
Para agilizar o fluxo de pós-produção do fotógrafo, o dashboard contará com duas opções vitais na visualização da galeria:
*   **Cópia para o Lightroom:** Um botão que copia uma lista formatada (nomes dos arquivos separados por vírgula) de todas as fotos selecionadas, permitindo que o fotógrafo filtre rapidamente os arquivos originais (RAWs) no Lightroom.
*   **Download Filtrado:** Uma opção para visualizar e baixar apenas o pacote de imagens que o cliente marcou como selecionadas, isolando-as do resto da galeria.

## 7. Status da Galeria e Acompanhamento de Progresso
A galeria deixará de ter um estado perpétuo e passará a ter um **Status** claro (ex: "Em Aberto", "Em Andamento", "Finalizada"), acompanhado de uma porcentagem de progresso do pacote (ex: "15 de 30 fotos - 50%"). Isso será alimentado por duas ações distintas que o cliente terá na interface dele: o botão de "Salvar" (guarda o progresso atual para continuar depois) e o de "Concluir Seleção" (que fecha oficialmente a escolha e atualiza o dashboard do fotógrafo).

## 8. Trava de Pacote (Limite de Seleção)
Na criação ou edição da galeria, o fotógrafo poderá estipular o tamanho exato do pacote que o cliente comprou (ex: 30 fotos). O sistema aplicará uma trava sistêmica que impedirá o cliente de marcar uma quantidade maior do que a permitida. Caso queira escolher mais, o cliente terá que desmarcar uma foto anterior ou negociar um "upgrade" de pacote com o fotógrafo.
