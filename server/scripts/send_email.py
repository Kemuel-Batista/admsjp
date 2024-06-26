import smtplib
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from datetime import datetime

# Configurações do servidor SMTP do Gmail
smtp_server = "smtp.gmail.com"
smtp_port = 587
smtp_username = "kemuellima20@gmail.com"  # Insira aqui o seu email do Gmail
smtp_password = "roezgbcoskjtcozs"  # Insira aqui a senha do seu email do Gmail

# Função para enviar email com os arquivos em anexo
def send_email(subject, body, sender_email, recipient_email, attachment_folder):
    # Cria o objeto MIMEMultipart para o email
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = recipient_email
    message["Subject"] = subject

    # Adiciona o corpo do email como texto
    body_text = MIMEText(body)
    message.attach(body_text)

    # Anexa os arquivos contidos na pasta de destino ao email
    for filename in os.listdir(attachment_folder):
        file_path = os.path.join(attachment_folder, filename)
        with open(file_path, "rb") as attachment:
            part = MIMEApplication(attachment.read())
            part.add_header(
                "Content-Disposition", "attachment", filename=filename
            )
            message.attach(part)

    # Conecta-se ao servidor SMTP e envia o email
    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(smtp_username, smtp_password)
        server.send_message(message)

if __name__ == "__main__":
    # Configurações do email
    current_datetime = datetime.now()
    current_date = current_datetime.strftime("%Y-%m-%d")
    current_hour = current_datetime.strftime("%H-%M")
    subject = f"Arquivos de Backup - ADMSJP - {current_date} - {current_hour}"
    body = "Segue anexado os arquivos de backup do app ADMSJP."
    sender_email = smtp_username
    recipient_email = "kemuellima20@gmail.com"  # Insira aqui o email de destino

    # Pasta de destino do backup gerado pelo script em bash
    backup_folder = "/projects/backup"

    # Criar o nome da pasta de backup do dia e hora atuais
    backup_folder_today = f"admsjp-{current_date}_{current_hour}"

    # Caminho completo da pasta de backup do dia e hora atuais
    attachment_folder = os.path.join(backup_folder, backup_folder_today)

    # Envia o email com os arquivos em anexo
    send_email(subject, body, sender_email, recipient_email, attachment_folder)
