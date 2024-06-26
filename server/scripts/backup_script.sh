#!/bin/bash
# bancos MySQL e Postgres
# Postgres:
# Dever ser permitido o localhost como trust
# no arquivo pg_hba.conf
DATA=$(date +%Y-%m-%d_%H-%M)

# Diretorio local de backup
PBACKUP="/home/admsjpuser/projects/admsjp/backup"

HOST=$(hostname)

# -- LIMPEZA ---
# Os arquivos dos ultimos 5 dias serao mantidos
NDIAS="5"

if [ ! -d ${PBACKUP} ]; then
	echo ""
	echo " A pasta de backup nao foi encontrada!"
	mkdir -p ${PBACKUP}
	echo " Iniciando Tarefa de backup..."
	echo ""
else
	echo ""
	echo " Rotacionando backups mais antigos que $NDIAS"
	echo ""

	find ${PBACKUP} -type d -mtime +$NDIAS -exec rm -rf {} \;

fi

### Postgres

if [ ! -d $PBACKUP/admsjp-$DATA ]; then
  mkdir -p $PBACKUP/admsjp-$DATA/
fi

chown -R postgres:postgres $PBACKUP/admsjp-$DATA/


su - postgres -c "vacuumdb -a -f -z"

for basepostgres in $(su - postgres -c "psql -l" | grep -v template0 | grep -v template1 | grep -v restaurantsystem | grep -v postgres | grep "|" |grep -v Owner |awk '{if ($1 != "|" && $1 != "Nome") print $1}'); do
  su - postgres -c "pg_dump $basepostgres > $PBACKUP/admsjp-$DATA/$basepostgres.txt"

  cd $PBACKUP/admsjp-$DATA/

  tar -czvf $basepostgres.tar.gz $basepostgres.txt
		
  sha1sum $basepostgres.tar.gz > $basepostgres.sha1

  rm -rf $basepostgres.txt

	cd /

done

DAYOFWEEK=$(date +"%u")
if [ "${DAYOFWEEK}" -eq 7  ];  then

  # Otimizacao das tabelas
  su - postgres -c "vacuumdb -a -f -z"
  # Backup de todo o banco
  su - postgres -c "pg_dumpall > $PBACKUP/admsjp-$DATA/postgres_tudo.txt"

  cd ${PBACKUP}/${DATA}/postgres/

  tar -czvf postgres_tudo.tar.gz postgres_tudo.txt
   
  sha1sum postgres_tudo.tar.gz > postgres_tudo.sha1

  rm -f postgres_tudo.txt  

fi


exit 0