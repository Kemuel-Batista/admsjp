import dotenv from 'dotenv'

dotenv.config()

const authConfig = {
  secretToken: process.env.APP_SECRET || 'defaultSecretToken',
  secretRefreshToken:
    process.env.APP_REFRESH_SECRET || 'defaultSecretRefreshToken',
  expiresInToken: '60m',
  expiresInRefreshToken: '1d',
  expiresInRefreshTokenInDays: 1,
}

export { authConfig }
