import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
const initialState = {
  nombre_apellido: '',
  telefono: '',
  numero_parte: '',
  marca: '',
  modelo: '',
  anio: '',
  placa: '',
  vin: '',
  imagen: null,
  correo: '',
};

export default function RequestAutopartForm({ onCancel }) {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      let imagen_url = '';
      if (form.imagen) {
        // For now, skip image upload. You can integrate with S3, Cloudinary, etc.
        imagen_url = 'uploaded-image-url';
      }
      const payload = {
        nombre_apellido: form.nombre_apellido,
        telefono: form.telefono,
        numero_parte: form.numero_parte,
        marca: form.marca,
        modelo: form.modelo,
        anio: form.anio,
        placa: form.placa,
        vin: form.vin,
        imagen_url,
        correo: form.correo,
        lang: i18n.language || 'es',
      };
      const res = await fetch('/api/request-autopart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(data.message);
        setForm(initialState);
      } else {
        setError(data.error || 'Error');
      }
    } catch (err) {
      setError('Error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="autopart-form" onSubmit={handleSubmit} style={{
      maxWidth: 480,
      margin: '0 auto',
      background: 'transparent',
      borderRadius: 0,
      boxShadow: 'none',
      padding: 0,
      border: 'none',
      fontFamily: 'inherit',
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }}>
      <h2 style={{
        color: '#fff',
        fontWeight: 800,
        marginBottom: 8,
        textAlign: 'center',
        letterSpacing: 0.5,
        fontSize: 28
      }}>{t('requestAutopart.title')}</h2>
      <p style={{textAlign:'center',color:'#bdbddd',marginBottom:18,fontSize:15}}>{t('requestAutopart.description')}</p>
      <div style={{display:'flex',gap:16}}>
        <div style={{flex:1}}>
          <label style={{fontWeight:600,marginBottom:6,display:'block',color:'#fff'}}>{t('requestAutopart.nombre_apellido')}</label>
          <input name="nombre_apellido" value={form.nombre_apellido} onChange={handleChange} required style={{width:'100%',padding:12,borderRadius:8,border:'1px solid #35356b',background:'#232344',color:'#fff',fontSize:15}} placeholder={t('requestAutopart.nombre_apellido_ph')} />
        </div>
        <div style={{flex:1}}>
          <label style={{fontWeight:600,marginBottom:6,display:'block',color:'#fff'}}>{t('requestAutopart.telefono')}</label>
          <input name="telefono" value={form.telefono} onChange={handleChange} style={{width:'100%',padding:12,borderRadius:8,border:'1px solid #35356b',background:'#232344',color:'#fff',fontSize:15}} placeholder={t('requestAutopart.telefono_ph')} />
        </div>
      </div>
      <div style={{display:'flex',gap:16}}>
        <div style={{flex:1}}>
          <label style={{fontWeight:600,marginBottom:6,display:'block',color:'#fff'}}>{t('requestAutopart.numero_parte')}</label>
          <input name="numero_parte" value={form.numero_parte} onChange={handleChange} style={{width:'100%',padding:12,borderRadius:8,border:'1px solid #35356b',background:'#232344',color:'#fff',fontSize:15}} placeholder={t('requestAutopart.numero_parte_ph')} />
        </div>
        <div style={{flex:1}}>
          <label style={{fontWeight:600,marginBottom:6,display:'block',color:'#fff'}}>{t('requestAutopart.marca')}</label>
          <input name="marca" value={form.marca} onChange={handleChange} style={{width:'100%',padding:12,borderRadius:8,border:'1px solid #35356b',background:'#232344',color:'#fff',fontSize:15}} placeholder={t('requestAutopart.marca_ph')} />
        </div>
      </div>
      <div style={{display:'flex',gap:16}}>
        <div style={{flex:1}}>
          <label style={{fontWeight:600,marginBottom:6,display:'block',color:'#fff'}}>{t('requestAutopart.modelo')}</label>
          <input name="modelo" value={form.modelo} onChange={handleChange} style={{width:'100%',padding:12,borderRadius:8,border:'1px solid #35356b',background:'#232344',color:'#fff',fontSize:15}} placeholder={t('requestAutopart.modelo_ph')} />
        </div>
        <div style={{flex:1}}>
          <label style={{fontWeight:600,marginBottom:6,display:'block',color:'#fff'}}>{t('requestAutopart.anio')}</label>
          <input name="anio" value={form.anio} onChange={handleChange} style={{width:'100%',padding:12,borderRadius:8,border:'1px solid #35356b',background:'#232344',color:'#fff',fontSize:15}} placeholder={t('requestAutopart.anio_ph')} />
        </div>
      </div>
      <div style={{display:'flex',gap:16}}>
        <div style={{flex:1}}>
          <label style={{fontWeight:600,marginBottom:6,display:'block',color:'#fff'}}>{t('requestAutopart.placa')}</label>
          <input name="placa" value={form.placa} onChange={handleChange} style={{width:'100%',padding:12,borderRadius:8,border:'1px solid #35356b',background:'#232344',color:'#fff',fontSize:15}} placeholder={t('requestAutopart.placa_ph')} />
        </div>
        <div style={{flex:1}}>
          <label style={{fontWeight:600,marginBottom:6,display:'block',color:'#fff'}}>{t('requestAutopart.vin')}</label>
          <input name="vin" value={form.vin} onChange={handleChange} style={{width:'100%',padding:12,borderRadius:8,border:'1px solid #35356b',background:'#232344',color:'#fff',fontSize:15}} placeholder={t('requestAutopart.vin_ph')} />
        </div>
      </div>
      <div style={{display:'flex',gap:16}}>
        <div style={{flex:1}}>
          <label style={{fontWeight:600,marginBottom:6,display:'block',color:'#fff'}}>{t('requestAutopart.imagen')}</label>
          <input name="imagen" type="file" accept="image/*" onChange={handleChange} style={{width:'100%',padding:12,borderRadius:8,border:'1px solid #35356b',background:'#232344',color:'#fff',fontSize:15}} />
        </div>
        <div style={{flex:1}}>
          <label style={{fontWeight:600,marginBottom:6,display:'block',color:'#fff'}}>{t('requestAutopart.correo')}</label>
          <input name="correo" value={form.correo} onChange={handleChange} type="email" style={{width:'100%',padding:12,borderRadius:8,border:'1px solid #35356b',background:'#232344',color:'#fff',fontSize:15}} placeholder={t('requestAutopart.correo_ph')} />
        </div>
      </div>
      <div style={{display:'flex',gap:16,marginTop:10,justifyContent:'center'}}>
        <button
          type="submit"
          className="btn-main"
          style={{
            minWidth: 180,
            padding: '12px 36px',
            fontWeight: 700,
            fontSize: 17,
            letterSpacing: 0.5,
            cursor: submitting ? 'not-allowed' : 'pointer',
            opacity: submitting ? 0.7 : 1,
            transition: 'all 0.2s',
          }}
          disabled={submitting}
        >
          {submitting ? t('requestAutopart.sending') : t('requestAutopart.submit')}
        </button>
        {onCancel && (
          <button type="button" style={{
            background: 'transparent',
            color: '#fff',
            padding: '12px 36px',
            border: '2px solid #fff',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 17,
            cursor: 'pointer',
            transition: 'all 0.2s',
            letterSpacing: 0.5,
          }} onClick={onCancel}>
            {t('requestAutopart.cancel')}
          </button>
        )}
      </div>
      {success && <div style={{marginTop: 18,textAlign:'center',fontWeight:600,color:'#6a79fa',fontSize:16}}>{success}</div>}
      {error && <div style={{marginTop: 10,textAlign:'center',fontWeight:600,color:'#e615af',fontSize:16}}>{error}</div>}
    </form>
  );
}
