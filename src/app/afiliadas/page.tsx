"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Afiliada {
    id: string;
    nome: string;
    foto?: string;
    whatsapp: string;
    destaque?: boolean;
}

function getApiUrl(path: string) {
    return path;
}

function formatWhatsAppDisplay(whatsapp: string) {
    const numbers = whatsapp.replace(/\D/g, '');
    if (numbers.length === 11) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
    if (numbers.length === 10) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6, 10)}`;
    }
    return whatsapp;
}

function getWhatsAppLink(whatsapp: string) {
    const numbers = whatsapp.replace(/\D/g, '');
    return `https://wa.me/55${numbers}`;
}

export default function AfiliadasPage() {
    const router = useRouter();
    const [afiliadas, setAfiliadas] = useState<Afiliada[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchAfiliadas() {
        try {
            const res = await fetch(getApiUrl('/api/afiliadas'));
            const data = await res.json();
            if (Array.isArray(data)) {
                setAfiliadas(data);
            } else {
                console.error('Esperado array de afiliadas, recebido:', data);
                setAfiliadas([]);
            }
        } catch (err) {
            console.error('Erro ao buscar afiliadas:', err);
            setAfiliadas([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAfiliadas();
    }, []);

    return (
        <div style={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '2rem'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ 
                    textAlign: 'center', 
                    marginBottom: '3rem',
                    color: 'white'
                }}>
                    <button
                        onClick={() => router.push("/")}
                        style={{
                            position: 'absolute',
                            top: '2rem',
                            left: '2rem',
                            padding: '0.75rem 1.5rem',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            border: '2px solid white',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            backdropFilter: 'blur(10px)',
                            transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                        }}
                    >
                        ← Voltar
                    </button>
                    <h1 style={{ 
                        fontSize: '3rem', 
                        fontWeight: 'bold', 
                        marginBottom: '1rem',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                    }}>
                        Nossas Afiliadas
                    </h1>
                    <p style={{ 
                        fontSize: '1.25rem',
                        opacity: 0.9
                    }}>
                        Entre em contato diretamente pelo WhatsApp
                    </p>
                </div>

                {/* Loading */}
                {loading && (
                    <div style={{ 
                        textAlign: 'center', 
                        color: 'white', 
                        fontSize: '1.5rem',
                        padding: '4rem'
                    }}>
                        Carregando afiliadas...
                    </div>
                )}

                {/* Grid de Afiliadas */}
                {!loading && afiliadas.length === 0 && (
                    <div style={{ 
                        textAlign: 'center', 
                        color: 'white', 
                        fontSize: '1.5rem',
                        padding: '4rem'
                    }}>
                        Nenhuma afiliada cadastrada no momento.
                    </div>
                )}

                {!loading && afiliadas.length > 0 && (
                    <>
                        {/* Afiliada Destaque */}
                        {afiliadas[0]?.destaque && (
                            <div style={{ marginBottom: '4rem' }}>
                                <div style={{ 
                                    textAlign: 'center',
                                    marginBottom: '2rem',
                                    color: 'white'
                                }}>
                                    <div style={{
                                        display: 'inline-block',
                                        padding: '0.5rem 1.5rem',
                                        backgroundColor: 'rgba(255, 193, 7, 0.3)',
                                        border: '2px solid #FFC107',
                                        borderRadius: '50px',
                                        color: '#FFC107',
                                        fontWeight: 'bold',
                                        fontSize: '1rem',
                                        marginBottom: '1rem'
                                    }}>
                                        ⭐ AFILIADA DESTAQUE
                                    </div>
                                </div>
                                <div style={{
                                    backgroundColor: 'white',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    boxShadow: '0 16px 48px rgba(0,0,0,0.3)',
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                                    gap: 0,
                                    maxWidth: '900px',
                                    margin: '0 auto',
                                    border: '3px solid #FFC107'
                                }}>
                                    {/* Foto */}
                                    <div style={{ 
                                        width: '100%',
                                        height: '400px',
                                        overflow: 'hidden',
                                        backgroundColor: '#f3f4f6'
                                    }}>
                                        {afiliadas[0]?.foto ? (
                                            <img 
                                                src={afiliadas[0].foto} 
                                                alt={afiliadas[0].nome}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        ) : (
                                            <div style={{
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#9ca3af',
                                                fontSize: '6rem'
                                            }}>
                                                👤
                                            </div>
                                        )}
                                    </div>

                                    {/* Conteúdo */}
                                    <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' }}>
                                        <h2 style={{ 
                                            fontSize: '2rem', 
                                            fontWeight: 'bold', 
                                            color: '#1f2937',
                                            margin: 0,
                                            textAlign: 'center'
                                        }}>
                                            {afiliadas[0]?.nome}
                                        </h2>
                                        
                                        <div style={{ 
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.75rem',
                                            color: '#6b7280',
                                            fontSize: '1.1rem'
                                        }}>
                                            <span style={{ fontSize: '1.5rem' }}>📱</span>
                                            <span>{formatWhatsAppDisplay(afiliadas[0]?.whatsapp || '')}</span>
                                        </div>

                                        {/* Botão WhatsApp */}
                                        <a
                                            href={getWhatsAppLink(afiliadas[0]?.whatsapp || '')}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.75rem',
                                                padding: '1.2rem',
                                                backgroundColor: '#25D366',
                                                color: 'white',
                                                borderRadius: '12px',
                                                textDecoration: 'none',
                                                fontWeight: 'bold',
                                                fontSize: '1.2rem',
                                                transition: 'all 0.3s',
                                                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = '#20BA5A';
                                                e.currentTarget.style.transform = 'scale(1.08)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = '#25D366';
                                                e.currentTarget.style.transform = 'scale(1)';
                                            }}
                                        >
                                            <svg 
                                                width="28" 
                                                height="28" 
                                                viewBox="0 0 24 24" 
                                                fill="currentColor"
                                            >
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                            </svg>
                                            Falar no WhatsApp
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Título para as outras afiliadas */}
                        {afiliadas.length > 1 && afiliadas[0]?.destaque && (
                            <div style={{ 
                                textAlign: 'center',
                                marginBottom: '2rem',
                                marginTop: '4rem',
                                color: 'white'
                            }}>
                                <h2 style={{ 
                                    fontSize: '2rem', 
                                    fontWeight: 'bold',
                                    margin: 0
                                }}>
                                    Outras Afiliadas
                                </h2>
                            </div>
                        )}

                        {/* Grid das outras afiliadas */}
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
                            gap: '2rem'
                        }}>
                            {afiliadas.map((afiliada, index) => {
                                // Pula a afiliada destaque se for a primeira
                                if (index === 0 && afiliada.destaque) {
                                    return null;
                                }
                                
                                return (
                                    <div 
                                        key={afiliada.id} 
                                        style={{
                                            backgroundColor: 'white',
                                            borderRadius: '16px',
                                            overflow: 'hidden',
                                            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                                            transition: 'transform 0.3s, box-shadow 0.3s',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-8px)';
                                            e.currentTarget.style.boxShadow = '0 12px 48px rgba(0,0,0,0.3)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)';
                                        }}
                                    >
                                        {/* Foto */}
                                        {afiliada.foto ? (
                                            <div style={{ 
                                                width: '100%',
                                                height: '300px',
                                                overflow: 'hidden',
                                                backgroundColor: '#f3f4f6'
                                            }}>
                                                <img 
                                                    src={afiliada.foto} 
                                                    alt={afiliada.nome}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <div style={{ 
                                                width: '100%',
                                                height: '300px',
                                                backgroundColor: '#e5e7eb',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#9ca3af',
                                                fontSize: '4rem'
                                            }}>
                                                👤
                                            </div>
                                        )}

                                        {/* Conteúdo */}
                                        <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            <h3 style={{ 
                                                fontSize: '1.5rem', 
                                                fontWeight: 'bold', 
                                                color: '#1f2937',
                                                margin: 0,
                                                textAlign: 'center'
                                            }}>
                                                {afiliada.nome}
                                            </h3>
                                            
                                            <div style={{ 
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.5rem',
                                                color: '#6b7280',
                                                fontSize: '1rem'
                                            }}>
                                                <span style={{ fontSize: '1.25rem' }}>📱</span>
                                                <span>{formatWhatsAppDisplay(afiliada.whatsapp)}</span>
                                            </div>

                                            {/* Botão WhatsApp */}
                                            <a
                                                href={getWhatsAppLink(afiliada.whatsapp)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '0.75rem',
                                                    padding: '1rem',
                                                    backgroundColor: '#25D366',
                                                    color: 'white',
                                                    borderRadius: '12px',
                                                    textDecoration: 'none',
                                                    fontWeight: 'bold',
                                                    fontSize: '1.1rem',
                                                    transition: 'all 0.3s',
                                                    boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
                                                    marginTop: 'auto'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#20BA5A';
                                                    e.currentTarget.style.transform = 'scale(1.05)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#25D366';
                                                    e.currentTarget.style.transform = 'scale(1)';
                                                }}
                                            >
                                                <svg 
                                                    width="24" 
                                                    height="24" 
                                                    viewBox="0 0 24 24" 
                                                    fill="currentColor"
                                                >
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                                </svg>
                                                Falar no WhatsApp
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
