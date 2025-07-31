
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function PrivacyPage() {
  const location = useLocation();
  const [lang, setLang] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('lang') === 'es' ? 'es' : 'en';
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setLang(params.get('lang') === 'es' ? 'es' : 'en');
  }, [location.search]);

  return (
    <div className="container" style={{maxWidth: 900, margin: '0 auto', padding: '48px 0'}}>
      {lang === 'es' ? (
        <>
          <h1 className="mb-4" style={{fontWeight: 800, color: 'var(--primary-color, #5623d8)'}}>Política de Privacidad</h1>
          <p className="mb-3">Última actualización: 30 de julio de 2025</p>
          <p>Netora, LLC ("nosotros") se compromete a proteger tu privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos y protegemos tu información cuando utilizas nuestro sitio web y servicios en Estados Unidos y Centroamérica.</p>
          <h3>1. Información que Recopilamos</h3>
          <p>Recopilamos la información que proporcionas directamente (como nombre, correo electrónico y detalles de pago) y la información recopilada automáticamente (como dirección IP y datos de uso).</p>
          <h3>2. Cómo Usamos tu Información</h3>
          <p>Usamos tu información para proporcionar, mantener y mejorar nuestros servicios, procesar transacciones, comunicarnos contigo y cumplir con obligaciones legales.</p>
          <h3>3. Compartir tu Información</h3>
          <p>No vendemos tu información personal. Podemos compartir información con terceros de confianza que nos ayudan a operar nuestro sitio web y servicios, según lo exija la ley o para proteger nuestros derechos.</p>
          <h3>4. Seguridad de los Datos</h3>
          <p>Implementamos medidas de seguridad razonables para proteger tu información. Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro.</p>
          <h3>5. Tus Derechos</h3>
          <p>Puedes tener derechos bajo las leyes de EE. UU. y Centroamérica para acceder, corregir o eliminar tu información personal. Contáctanos para ejercer estos derechos.</p>
          <h3>6. Privacidad de los Niños</h3>
          <p>Nuestros servicios no están dirigidos a menores de 13 años. No recopilamos intencionalmente información personal de menores de 13 años.</p>
          <h3>7. Cambios en esta Política</h3>
          <p>Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos de cambios importantes publicando la nueva política en nuestro sitio web.</p>
          <h3>8. Contáctanos</h3>
          <p>Si tienes alguna pregunta sobre esta Política de Privacidad, contáctanos en privacy@netora.com.</p>
        </>
      ) : (
        <>
          <h1 className="mb-4" style={{fontWeight: 800, color: 'var(--primary-color, #5623d8)'}}>Privacy Policy</h1>
          <p className="mb-3">Last updated: July 30, 2025</p>
          <p>Netora, LLC ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services in the United States and Central America.</p>
          <h3>1. Information We Collect</h3>
          <p>We collect information you provide directly (such as name, email, and payment details) and information automatically collected (such as IP address and usage data).</p>
          <h3>2. How We Use Your Information</h3>
          <p>We use your information to provide, maintain, and improve our services, process transactions, communicate with you, and comply with legal obligations.</p>
          <h3>3. Sharing Your Information</h3>
          <p>We do not sell your personal information. We may share information with trusted third parties who assist us in operating our website and services, as required by law, or to protect our rights.</p>
          <h3>4. Data Security</h3>
          <p>We implement reasonable security measures to protect your information. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>
          <h3>5. Your Rights</h3>
          <p>You may have rights under U.S. and Central American laws to access, correct, or delete your personal information. Contact us to exercise these rights.</p>
          <h3>6. Children's Privacy</h3>
          <p>Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13.</p>
          <h3>7. Changes to This Policy</h3>
          <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on our website.</p>
          <h3>8. Contact Us</h3>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@netora.com.</p>
        </>
      )}
    </div>
  );
}
