mkdir -p keys

# private key 생성
openssl genrsa -out keys/private.pem 2048
echo "private keys generated at ./keys/private.pem"

# public key 생성
openssl rsa -in keys/private.pem -pubout -out keys/public.pem
echo "public keys generated at ./keys/public.pem"