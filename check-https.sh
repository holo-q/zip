#!/bin/bash

echo "🔍 Checking HTTPS status for holoq.ai..."
echo ""

# Check if HTTPS responds
if curl -sI https://holoq.ai 2>&1 | grep -q "HTTP/2 200"; then
    echo "✅ HTTPS is working!"
    echo ""
    # Check certificate
    echo "Certificate details:"
    timeout 2 openssl s_client -connect holoq.ai:443 -servername holoq.ai </dev/null 2>/dev/null | grep -E "subject="
else
    echo "⏳ HTTPS not ready yet (certificate still provisioning)"
    echo ""
    # Check GitHub Pages API
    echo "GitHub Pages status:"
    gh api repos/holo-q/zip/pages 2>/dev/null | jq '{https_enforced: .https_enforced, domain_verified: .protected_domain_state}'
fi