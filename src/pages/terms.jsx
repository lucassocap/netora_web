
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function TermsPage() {
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
          <h1 className="mb-4" style={{fontWeight: 800, color: 'var(--primary-color, #5623d8)'}}>Términos y Condiciones</h1>
          <p className="mb-3">Última actualización: 30 de julio de 2025</p>
          <p>Bienvenido a Netora, LLC. Estos Términos y Condiciones ("Términos") rigen el uso de nuestro sitio web y servicios. Al acceder o utilizar nuestros servicios, aceptas estar sujeto a estos Términos. Si no estás de acuerdo, por favor no utilices nuestros servicios.</p>
          <h3>1. Uso de los Servicios</h3>
          <p>Debes tener al menos 18 años o contar con el consentimiento de un padre o tutor para utilizar nuestros servicios. Aceptas usar nuestros servicios solo para fines legales y de acuerdo con estos Términos.</p>
          <h3>2. Cuentas</h3>
          <p>Es posible que debas crear una cuenta para acceder a ciertas funciones. Eres responsable de mantener la confidencialidad de tu cuenta y contraseña, así como de todas las actividades que ocurran bajo tu cuenta.</p>
          <h3>3. Pagos</h3>
          <p>Todos los pagos se procesan de forma segura. Al realizar una compra, aceptas proporcionar información de pago precisa y autorizas que cobremos las tarifas aplicables.</p>
          <h3>4. Propiedad Intelectual</h3>
          <p>Todo el contenido, marcas y datos en este sitio son propiedad de Netora, LLC o sus licenciantes. No puedes usar, reproducir o distribuir ningún contenido sin nuestro permiso por escrito.</p>
          <h3>5. Limitación de Responsabilidad</h3>
          <p>Netora, LLC no es responsable de daños indirectos, incidentales o consecuentes derivados del uso de nuestros servicios. Nuestra responsabilidad total se limita al monto que pagaste por el servicio.</p>
          <h3>6. Ley Aplicable</h3>
          <p>Estos Términos se rigen por las leyes de los Estados Unidos y, cuando corresponda, por las leyes de los países de Centroamérica en los que operamos.</p>
          <h3>7. Cambios en los Términos</h3>
          <p>Podemos actualizar estos Términos en cualquier momento. Te notificaremos de cambios importantes publicando los nuevos Términos en nuestro sitio web. El uso continuado de nuestros servicios después de los cambios significa que aceptas los nuevos Términos.</p>
          <h3>8. Contáctanos</h3>
          <p>Si tienes alguna pregunta sobre estos Términos, contáctanos en support@netora.com.</p>
        </>
      ) : (
        <>
          <h1 className="mb-4" style={{fontWeight: 800, color: 'var(--primary-color, #5623d8)'}}>Terms &amp; Conditions</h1>
          <p className="mb-3">Last updated: July 30, 2025</p>
          <p>Welcome to Netora, LLC. These Terms &amp; Conditions ("Terms") govern your use of our website and services. By accessing or using our services, you agree to be bound by these Terms. If you do not agree, please do not use our services.</p>
          <h3>1. Use of Services</h3>
          <p>You must be at least 18 years old or have the consent of a parent or guardian to use our services. You agree to use our services only for lawful purposes and in accordance with these Terms.</p>
          <h3>2. Accounts</h3>
          <p>You may be required to create an account to access certain features. You are responsible for maintaining the confidentiality of your account and password and for all activities that occur under your account.</p>
          <h3>3. Payments</h3>
          <p>All payments are processed securely. By making a purchase, you agree to provide accurate payment information and authorize us to charge the applicable fees.</p>
          <h3>4. Intellectual Property</h3>
          <p>All content, trademarks, and data on this site are the property of Netora, LLC or its licensors. You may not use, reproduce, or distribute any content without our written permission.</p>
          <h3>5. Limitation of Liability</h3>
          <p>Netora, LLC is not liable for any indirect, incidental, or consequential damages arising from your use of our services. Our total liability is limited to the amount you paid for the service.</p>
          <h3>6. Governing Law</h3>
          <p>These Terms are governed by the laws of the United States and, where applicable, the laws of Central American countries in which we operate.</p>
          <h3>7. Changes to Terms</h3>
          <p>We may update these Terms at any time. We will notify you of significant changes by posting the new Terms on our website. Your continued use of our services after changes means you accept the new Terms.</p>
          <h3>8. Contact Us</h3>
          <p>If you have any questions about these Terms, please contact us at support@netora.com.</p>
        </>
      )}
    </div>
  );
}
