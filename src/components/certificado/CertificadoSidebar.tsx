"use client";

import React from "react";
import { FaArrowLeft, FaPrint } from "react-icons/fa";

interface ModeloOption {
  value: string;
  label: string;
  faixaClass: string;
}

interface FontOption {
  label: string;
  value: string;
}

interface Props {
  alunoNomePreview: string;
  previewConfig: ModeloOption;
  selectedModelConfig: ModeloOption;
  MODELOS: ModeloOption[];
  selectedModel: string;
  setSelectedModel: React.Dispatch<React.SetStateAction<string>>;
  hoveredModel: string | null;
  setHoveredModel: React.Dispatch<React.SetStateAction<string | null>>;
  isModelMenuOpen: boolean;
  setIsModelMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modelMenuRef: React.RefObject<HTMLDivElement>;

  FONT_OPTIONS: FontOption[];
  selectedFontConfig: FontOption;
  selectedFont: string;
  setSelectedFont: React.Dispatch<React.SetStateAction<string>>;
  hoveredFont: string | null;
  setHoveredFont: React.Dispatch<React.SetStateAction<string | null>>;
  isFontMenuOpen: boolean;
  setIsFontMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fontMenuRef: React.RefObject<HTMLDivElement>;

  fontScale: number;
  adjustFontScale: (delta: number) => void;
  normalizeScale: (v: number) => number;
  FONT_SCALE_PRESETS: { label: string; value: number }[];

  handlePrint: () => void;
  handleVoltar: () => void;
}

export default function CertificadoSidebar(props: Props) {
  const {
    alunoNomePreview,
    previewConfig,
    selectedModelConfig,
    MODELOS,
    selectedModel,
    setSelectedModel,
    hoveredModel,
    setHoveredModel,
    isModelMenuOpen,
    setIsModelMenuOpen,
    modelMenuRef,
    FONT_OPTIONS,
    selectedFontConfig,
    selectedFont,
    setSelectedFont,
    hoveredFont,
    setHoveredFont,
    isFontMenuOpen,
    setIsFontMenuOpen,
    fontMenuRef,
    fontScale,
    adjustFontScale,
    normalizeScale,
    FONT_SCALE_PRESETS,
    handlePrint,
    handleVoltar,
  } = props;

  return (
    <aside className="print:hidden mb-6 lg:mb-0 lg:fixed lg:left-0 lg:top-0 lg:bottom-0 lg:w-80 lg:p-4 lg:flex lg:flex-col">
      <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm lg:shadow-none lg:h-full lg:flex lg:flex-col lg:overflow-hidden">
        <div className="space-y-4 lg:flex-1 lg:min-h-0 lg:overflow-y-auto lg:pr-1">
          <h2 className="text-lg font-semibold text-stone-800">Personalização</h2>

          <div className="space-y-2" onMouseLeave={() => setHoveredModel(null)}>
            <label className="text-sm font-medium text-stone-700">Modelo da faixa</label>
            <div className="relative" ref={modelMenuRef}>
              <button
                type="button"
                onClick={() => setIsModelMenuOpen((prev) => !prev)}
                className="cursor-pointer w-full inline-flex items-center justify-between rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm text-stone-700 hover:border-stone-500 transition"
              >
                <span>Faixa {selectedModelConfig.label.toLowerCase()}</span>
                <span className="text-xs">▾</span>
              </button>

              {isModelMenuOpen && (
                <div className="absolute left-0 top-full z-30 mt-2 w-full overflow-hidden rounded-xl border border-stone-200 bg-white shadow-lg">
                  {MODELOS.map((modelo) => (
                    <button
                      key={modelo.value}
                      type="button"
                      onMouseEnter={() => setHoveredModel(modelo.value)}
                      onFocus={() => setHoveredModel(modelo.value)}
                      onClick={() => {
                        setSelectedModel(modelo.value);
                        setIsModelMenuOpen(false);
                        setHoveredModel(null);
                      }}
                      className={`cursor-pointer flex w-full items-center justify-between px-3 py-2 text-left text-sm transition ${
                        selectedModel === modelo.value
                          ? "bg-stone-100 text-stone-900"
                          : "text-stone-700 hover:bg-stone-50"
                      }`}
                    >
                      <span>Faixa {modelo.label.toLowerCase()}</span>
                      <span className={`h-3 w-3 rounded-full ${modelo.faixaClass}`}></span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
              <div className={`h-2 ${previewConfig.faixaClass}`}></div>
              <div className="px-3 py-3">
                <p className="text-[10px] font-semibold text-slate-800">PRÉVIA</p>
                <div className="mt-2 space-y-1">
                  <div className="h-1.5 w-24 rounded bg-stone-300"></div>
                  <div className="h-1.5 w-20 rounded bg-stone-200"></div>
                </div>
              </div>
              <div className={`h-2 ${previewConfig.faixaClass}`}></div>
            </div>
          </div>

          <div className="space-y-2" onMouseLeave={() => setHoveredFont(null)}>
            <label className="text-sm font-medium text-stone-700">Fonte do certificado</label>
            <div className="relative" ref={fontMenuRef}>
              <button
                type="button"
                onClick={() => setIsFontMenuOpen((prev) => !prev)}
                className="cursor-pointer w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-left text-sm text-stone-700 hover:border-stone-500 transition"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs text-stone-500">{selectedFontConfig.label}</p>
                    <p className="text-sm text-stone-900" style={{ fontFamily: selectedFont }}>
                      {alunoNomePreview}
                    </p>
                  </div>
                  <span className="text-xs">▾</span>
                </div>
              </button>

              {isFontMenuOpen && (
                <div className="absolute left-0 top-full z-30 mt-2 w-full overflow-hidden rounded-xl border border-stone-200 bg-white shadow-lg max-h-72 overflow-y-auto">
                  {FONT_OPTIONS.map((font) => (
                    <button
                      key={font.label}
                      type="button"
                      onMouseEnter={() => setHoveredFont(font.value)}
                      onFocus={() => setHoveredFont(font.value)}
                      onClick={() => {
                        setSelectedFont(font.value);
                        setIsFontMenuOpen(false);
                        setHoveredFont(null);
                      }}
                      className={`cursor-pointer w-full px-3 py-2 text-left transition ${
                        selectedFont === font.value ? "bg-stone-100" : "hover:bg-stone-50"
                      }`}
                    >
                      <p className="text-xs text-stone-500">{font.label}</p>
                      <p className="text-base text-stone-900" style={{ fontFamily: font.value }}>
                        {alunoNomePreview}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="font-size" className="text-sm font-medium text-stone-700">
              Tamanho da fonte ({Math.round(fontScale * 100)}%)
            </label>
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-3 space-y-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => adjustFontScale(-0.05)}
                  className="cursor-pointer h-9 w-9 rounded-lg border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 transition"
                  aria-label="Diminuir tamanho da fonte"
                >
                  −
                </button>

                <div className="flex-1 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-center">
                  <span className="text-xs text-stone-500">Escala</span>
                  <p className="text-sm font-semibold text-stone-800">{Math.round(fontScale * 100)}%</p>
                </div>

                <button
                  type="button"
                  onClick={() => adjustFontScale(0.05)}
                  className="cursor-pointer h-9 w-9 rounded-lg border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 transition"
                  aria-label="Aumentar tamanho da fonte"
                >
                  +
                </button>
              </div>

              <input
                id="font-size"
                type="range"
                min={0.8}
                max={1.3}
                step={0.05}
                value={fontScale}
                onChange={(event) => {
                  const v = Number(event.target.value);
                  const clamped = normalizeScale(v);
                  // no-op here; parent controls scale through provided adjustFontScale
                }}
                className="cursor-pointer w-full accent-amber-500"
              />

              <div className="flex flex-wrap gap-2">
                {FONT_SCALE_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => adjustFontScale(preset.value - fontScale)}
                    className={`cursor-pointer rounded-full border px-3 py-1 text-xs font-medium transition ${
                      Math.round(fontScale * 100) === Math.round(preset.value * 100)
                        ? "border-amber-500 bg-amber-100 text-amber-800"
                        : "border-stone-300 bg-white text-stone-700 hover:bg-stone-100"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-stone-200 space-y-2">
          <button
            onClick={handlePrint}
            className="cursor-pointer w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2.5 font-medium hover:from-blue-700 hover:to-blue-900 transition shadow-sm"
          >
            <FaPrint />
            <span>Imprimir Certificado</span>
          </button>
          <button
            onClick={handleVoltar}
            className="cursor-pointer w-full inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white text-stone-700 px-4 py-2.5 font-medium hover:bg-stone-100 transition"
          >
            <FaArrowLeft />
            <span>Voltar</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
