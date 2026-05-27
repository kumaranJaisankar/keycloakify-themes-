import { useEffect, useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import livePoisedLogoPngUrl from "./assets/img/Iyotaprep-app-logo.png";
import iyotaprepLogoUrl from "./assets/img/iyotaprep-logo.svg";


export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;

    const { realm, auth, url, message, isAppInitiatedAction } = kcContext;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", realm.displayName);
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? kcClsx("kcBodyClass")
    });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    if (!isReadyToRender) {
        return null;
    }

    return (
        <div className="relative h-screen w-full bg-slate-50 dark:bg-[#050505] flex flex-col md:flex-row overflow-hidden font-sans transition-colors duration-300">
            {/* Dynamic Full-Screen Background spanning both columns */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {/* Grid Pattern (Ruled Paper Feel) */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDEwaDQwdjJIMHoiIGZpbGw9IiMzMzMiIGZpbGwtb3BhY2l0eT0iMC4xIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPC9zdmc+')] opacity-20 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen" />

                {/* Faint Handwriting / Academic Scribbles */}
                <div className="absolute inset-0 w-full h-full opacity-[0.1] dark:opacity-[0.1] pointer-events-none overflow-hidden font-['Caveat',_'Bradley_Hand',_'Brush_Script_MT',_'Comic_Sans_MS',_cursive] text-blue-500 dark:text-blue-500">
                    {/* SVG Pen Strokes */}
                    {/* <svg className="absolute rotate-12 w-full h-full stroke-current fill-none pointer-events-none" preserveAspectRatio="none">
                        <path d="M 5% 30% Q 15% 25% 25% 35% T 45% 30%" strokeWidth="2" opacity="0.8" strokeDasharray="4,6" />
                        <path d="M 85vw 15vh Q 90vw 35vh 75vw 45vh" strokeWidth="2.5" opacity="0.8" strokeDasharray="10,15" />
                        <ellipse cx="55%" cy="80%" rx="140" ry="90" strokeWidth="2" opacity="0.8" transform="rotate(-15 65% 80%)" />
                    </svg> */}

                    <div className="absolute top-[18%] left-[8%] md:left-[12%] -rotate-[8deg] select-none text-2xl md:text-3xl tracking-wider">
                        {`∫ e^x dx = e^x + C`}
                    </div>
                    <div className="absolute top-[45%] right-[10%] md:right-[15%] rotate-[6deg] select-none text-xl md:text-3xl tracking-widest leading-relaxed">
                        Innovation <br /> &nbsp;&nbsp;&nbsp;through Learning
                    </div>
                    <div className="absolute bottom-[10%] left-[10%] md:left-[5%] rotate-[12deg] select-none text-3xl md:text-5xl opacity-80">
                        Unlock Your Potential...
                    </div>
                    <div className="absolute top-[10%] right-[25%] md:right-[40%] rotate-[3deg] select-none text-xl md:text-2xl">
                        Σ (n=1, ∞) 1/n² = π²/6
                    </div>
                    <div className="absolute bottom-[50%] right-[25%] md:right-[36%] rotate-[10deg] select-none text-lg md:text-xl">
                        "The beautiful thing about learning is..."
                    </div>
                </div>

                {/* Glowing Orbs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full bg-gradient-to-tr from-indigo-500/20 via-purple-500/10 to-transparent blur-[120px] animate-glow mix-blend-screen" />
                <div className="absolute top-1/4 -right-1/4 w-[400px] h-[400px] rounded-full bg-blue-400/20 blur-[100px] animate-glow mix-blend-screen" style={{ animationDelay: '2s' }} />
                <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[100px] animate-glow mix-blend-screen" style={{ animationDelay: '4s' }} />
            </div>

            {/* Left Column - Glow & Orbit */}

            {/* Left Section: Hero Branding */}
            <div className="relative z-10 w-full md:w-[50%] lg:w-[55%] h-[40%] md:h-full overflow-hidden group flex items-center justify-center">
                {/* Injected Styles for Animations */}
                <style>{`
                    @keyframes subtleZoomIn {
                        0% { transform: scale(0); opacity: 0; filter: blur(10px); }
                        100% { transform: scale(1.2); opacity: 1; filter: blur(0); }
                    }
                    @keyframes float {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-15px); }
                    }
                    @keyframes glowPulse {
                        0%, 100% { opacity: 0.3; transform: scale(1); }
                        50% { opacity: 0.6; transform: scale(1.05); }
                    }
                    .animate-zoom-in {
                        animation: subtleZoomIn 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    }
                    .animate-float {
                        animation: float 8s ease-in-out infinite;
                    }
                    .animate-glow {
                        animation: glowPulse 6s ease-in-out infinite;
                    }
                    .glass-panel {
                        background: rgba(255, 255, 255, 0.7);
                        backdrop-filter: blur(20px);
                        -webkit-backdrop-filter: blur(20px);
                        border: 1px solid rgba(0, 0, 0, 0.05);
                    }
                    .dark .glass-panel {
                        background: rgba(255, 255, 255, 0.03);
                        border: 1px solid rgba(255, 255, 255, 0.05);
                    }
                `}</style>

                {/* Main Content Area */}
                <div className="relative z-10 w-full max-w-2xl px-8 flex flex-col items-center justify-center text-center">

                    {/* Centerpiece Text */}
                    <div className="animate-zoom-in w-full flex flex-col items-center">
                        {/* Decorative Icon/Badge */}
                        <div className="mb-10 p-4 rounded-2xl glass-panel shadow-xl animate-float">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-400 p-[1px]">
                                <div className="w-full h-full rounded-[11px] bg-white dark:bg-[#050505] flex items-center justify-center transition-colors duration-300">
                                    <img src={iyotaprepLogoUrl} className="w-10 h-10 object-contain" alt="IyotaPrep" />
                                </div>
                            </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-white/60 tracking-tight leading-tight pb-4 mb-2">
                            IyotaPrep
                        </h2>

                        {/* Status/Badge */}
                        {/* <div className="glass-panel px-6 py-2 mb-8 rounded-full opacity-0" style={{ animation: 'subtleZoomIn 1s ease-out 0.4s forwards' }}>
                            <p className="text-xs font-bold text-indigo-600 dark:text-indigo-300/80 tracking-[0.25em] uppercase whitespace-nowrap">
                                Admin & Faculty Portal
                            </p>
                        </div> */}

                        {/* Proverb/Quote */}
                        <div className="relative mt-2">
                            <span className="absolute -top-6 -left-5 text-6xl text-indigo-500/20 -rotate-[20deg] dark:text-indigo-500/30 font-serif leading-none select-none">"</span>
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-slate-600 dark:text-slate-300 italic tracking-wide leading-relaxed">
                                Imaginary <br className="hidden lg:block" />
                                <span className="font-semibold text-slate-800 dark:text-white relative inline-block mx-2">
                                    Isn't
                                    <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                                </span> Impossible
                            </h3>
                            <span className="absolute -top-4 -right-5 text-6xl text-indigo-500/20 rotate-[20deg] dark:text-indigo-500/30 font-serif leading-none select-none">"</span>
                        </div>
                    </div>

                    {/* Bottom Space (Badge moved up) */}

                </div>
                <div className=" flex flex-row items-center gap-2 absolute top-2 left-10 z-50 p-2 rounded-full text-slate-800 dark:text-gray-200 "
                >
                    <a href="https://iyotaprep.vannadev.com/explore" className="outline-none focus:outline-none"> <img src={livePoisedLogoPngUrl} alt="Logo" className="w-30 h-14" /></a>
                </div>
                {/* Footer placed strictly within Left Column */}
                <div className=" flex flex-row items-center gap-2 absolute bottom-2 left-50 z-50 p-2 rounded-full text-slate-800 dark:text-gray-200 ">
                    <p className="text-slate-600 dark:text-slate-400/80 text-xs font-medium tracking-wide">
                        Iyota Prep v1.0.4 <span className="mx-2 hidden sm:inline">•</span><br className="sm:hidden" /> © 2026 Iyota Prep Inc.
                    </p>
                </div>

            </div>

            {/* Right Column - Login */}
            <div className="kc-right-column relative flex-1 flex flex-col min-h-screen md:min-h-full">
                {/* Theme Toggle Button */}
                <button
                    onClick={() => setIsDark(!isDark)}
                    className="absolute top-6 right-6 z-50 p-2 rounded-full bg-slate-200 dark:bg-gray-800 text-slate-800 dark:text-gray-200 shadow-sm border border-slate-300 dark:border-gray-700 hover:bg-slate-300 dark:hover:bg-gray-700 transition"
                    aria-label="Toggle Dark Mode"
                >
                    {isDark ? "🌙" : "☀️"}
                </button>
                {/* <div className=" flex flex-row items-center gap-2 absolute top-2 left-0 z-50 p-2 rounded-full text-slate-800 dark:text-gray-200 "
                >
                    <img src={livePoisedLogoPngUrl} alt="Logo" className="w-30 h-14" />
                </div> */}
                {/* Content Container */}
                <div className="flex-1 flex flex-col justify-center items-center px-8 sm:px-12 lg:px-12 xl:px-10 py-10 ">

                    {/* Marketing Copy Removed by Request */}

                    {/* KC Form */}
                    <div className="w-full max-w-md mx-auto relative z-10">
                        <div className={clsx("glass-panel !rounded-3xl !border-0 sm:!border shadow-2xl !p-6 sm:!p-10", kcClsx("kcFormCardClass"))}>
                            <header className={kcClsx("kcFormHeaderClass")}>
                                {enabledLanguages.length > 1 && (
                                    <div className={kcClsx("kcLocaleMainClass")} id="kc-locale">
                                        <div id="kc-locale-wrapper" className={kcClsx("kcLocaleWrapperClass")}>
                                            <div id="kc-locale-dropdown" className={clsx("menu-button-links", kcClsx("kcLocaleDropDownClass"))}>
                                                <button
                                                    tabIndex={1}
                                                    id="kc-current-locale-link"
                                                    aria-label={msgStr("languages")}
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                    aria-controls="language-switch1"
                                                >
                                                    {currentLanguage.label}
                                                </button>
                                                <ul
                                                    role="menu"
                                                    tabIndex={-1}
                                                    aria-labelledby="kc-current-locale-link"
                                                    aria-activedescendant=""
                                                    id="language-switch1"
                                                    className={kcClsx("kcLocaleListClass")}
                                                >
                                                    {enabledLanguages.map(({ languageTag, label, href }, i) => (
                                                        <li key={languageTag} className={kcClsx("kcLocaleListItemClass")} role="none">
                                                            <a role="menuitem" id={`language-${i + 1}`} className={kcClsx("kcLocaleItemClass")} href={href}>
                                                                {label}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {(() => {
                                    const node = !(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
                                        <h1 id="kc-page-title" className="!text-center !text-4xl !md:text-6xl !font-black !font-geist !text-slate-900 dark:!text-white !leading-[1] !tracking-tighter">
                                            {headerNode}
                                        </h1>
                                    ) : (
                                        <div id="kc-username" className={kcClsx("kcFormGroupClass")}>
                                            <label id="kc-attempted-username">{auth.attemptedUsername}</label>
                                            <a id="reset-login" href={url.loginRestartFlowUrl} aria-label={msgStr("restartLoginTooltip")}>
                                                <div className="kc-login-tooltip">
                                                    <i className={kcClsx("kcResetFlowIcon")}></i>
                                                    <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                                                </div>
                                            </a>
                                        </div>
                                    );

                                    if (displayRequiredFields) {
                                        return (
                                            <div className={kcClsx("kcContentWrapperClass")}>
                                                <div className="col-md-12">{node}</div>
                                            </div>
                                        );
                                    }

                                    return node;
                                })()}
                            </header>
                            <div id="kc-content">
                                <div id="kc-content-wrapper" className="w-full">
                                    {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                                    {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                                        <div
                                            className={clsx(
                                                `alert-${message.type}`,
                                                kcClsx("kcAlertClass"),
                                                `pf-m-${message?.type === "error" ? "danger" : message.type}`,
                                                "mb-6"
                                            )}
                                        >
                                            <div className="pf-c-alert__icon">
                                                {message.type === "success" && <span className={kcClsx("kcFeedbackSuccessIcon")}></span>}
                                                {message.type === "warning" && <span className={kcClsx("kcFeedbackWarningIcon")}></span>}
                                                {message.type === "error" && <span className={kcClsx("kcFeedbackErrorIcon")}></span>}
                                                {message.type === "info" && <span className={kcClsx("kcFeedbackInfoIcon")}></span>}
                                            </div>
                                            <span
                                                className={kcClsx("kcAlertTitleClass")}
                                                dangerouslySetInnerHTML={{
                                                    __html: kcSanitize(message.summary)
                                                }}
                                            />
                                        </div>
                                    )}
                                    {children}
                                    {auth !== undefined && auth.showTryAnotherWayLink && (
                                        <form id="kc-select-try-another-way-form" action={url.loginAction} method="post" className="mt-4">
                                            <div className={kcClsx("kcFormGroupClass")}>
                                                <input type="hidden" name="tryAnotherWay" value="on" />
                                                <a
                                                    href="#"
                                                    id="try-another-way"
                                                    className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                                                    onClick={() => {
                                                        document.forms["kc-select-try-another-way-form" as never].requestSubmit();
                                                        return false;
                                                    }}
                                                >
                                                    {msg("doTryAnotherWay")}
                                                </a>
                                            </div>
                                        </form>
                                    )}
                                    <div className="mt-6">
                                        {socialProvidersNode}
                                    </div>
                                    {displayInfo && (
                                        <div id="kc-info" className={kcClsx("kcSignUpClass") + " mt-6"}>
                                            <div id="kc-info-wrapper" className={kcClsx("kcInfoAreaWrapperClass")}>
                                                {infoNode}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
}
