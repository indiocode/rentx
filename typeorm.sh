#!/usr/bin/env bash
source ./.env

# Função de ajuda
function help() {
  echo "Uso: $0 [comando]"
  echo ""
  echo "Comandos suportados:"
  echo "  migration:create  Cria uma nova migração"
  echo "  migration:run     Executa todas as migrações pendentes"
  echo "  migration:revert  Reverte a última migração executada"
  echo "  schema:drop       Remove todas as tabelas do banco de dados"
  echo "  schema:sync       Cria ou atualiza as tabelas do banco de dados com base nas entidades definidas"
  echo "  seed:run              Cria/Adiciona dados em uma tabela no banco de dados"
  echo ""
}

# Verificar se o comando foi especificado
if [ -z "$1" ]; then
  echo "Erro: nenhum comando especificado."
  help
  exit 1
fi

# Executar o comando especificado
case "$1" in
  migration:create)
    echo "Digite o nome da migração: "
    read migration_name
    $TYPEORM_CLI migration:create $MIGRATION_DIR/$migration_name
    ;;
  migration:run)
    echo  $TYPEORM_CLI migration:run -d $DATA_SOURCE_DIR
    $TYPEORM_CLI migration:run -d $DATA_SOURCE_DIR
    ;;
  seed:run)
    echo  $TYPEORM_EXTENSION_CLI seed -d $DATA_SOURCE_DIR
    $TYPEORM_EXTENSION_CLI seed -d $DATA_SOURCE_DIR
    ;;
  migration:revert)
    npx typeorm migration:revert
    ;;
  schema:drop)
    echo  $TYPEORM_CLI schema:drop -d $DATA_SOURCE_DIR
    $TYPEORM_CLI schema:drop -d $DATA_SOURCE_DIR
    ;;
  schema:sync)
    npx typeorm schema:sync
    ;;
  *)
    echo "Erro: comando inválido."
    help
    exit 1
    ;;
esac