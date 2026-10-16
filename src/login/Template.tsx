import { useEffect, useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import rcipBrandLogoUrl from "./assets/img/rcip-brand-logo.png";
import rcipFaviconUrl from "./assets/img/icon.png";
import cliffLogoUrl from "./assets/img/brands_logo/Cliff_logo.png";
import corekeyLogoUrl from "./assets/img/brands_logo/corekey_logo.png";
import vannaLogoUrl from "./assets/img/brands_logo/vanna_logo_v3.png";
import caLogoUrl from "./assets/img/brands_logo/CA_logo_v3.png";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
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
        document.title = kcContext.pageId === "login.ftl" ? "Sign in to RCIP" : (documentTitle ?? msgStr("loginTitle", realm.displayName));

        const existingIcons = document.querySelectorAll("link[rel*='icon'], link[rel='apple-touch-icon']");
        existingIcons.forEach(el => el.remove());

        const link = document.createElement("link");
        link.rel = "icon";
        link.type = "image/png";
        link.href = rcipFaviconUrl;
        document.head.appendChild(link);

        const appleTouchLink = document.createElement("link");
        appleTouchLink.rel = "apple-touch-icon";
        appleTouchLink.href = rcipFaviconUrl;
        document.head.appendChild(appleTouchLink);
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

    const redirectDomain = (() => {
        if (typeof window === "undefined") return "https://rcip.in";
        try {
            const redirectUri = new URLSearchParams(window.location.search).get("redirect_uri");
            if (redirectUri) {
                return new URL(redirectUri).origin;
            }
        } catch {
            // fallback if invalid URL
        }
        return "https://rcip.in";
    })();

    return (
        <div className="relative h-screen w-full bg-gradient-to-br from-[#005AA2] via-[#003B70] to-[#002244] md:bg-none md:bg-[#F4F6F9] dark:md:bg-[#0B0C10] flex flex-col md:flex-row overflow-x-hidden overflow-y-auto md:overflow-hidden font-sans transition-colors duration-300">
            {/* Mobile Blueprint Grid & Glow Overlay (visible on < md) */}
            <div
                className="desktop-hidden absolute inset-0 opacity-40 pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
                    `,
                    backgroundSize: "32px 32px"
                }}
            />
            <div
                className="desktop-hidden absolute inset-0 pointer-events-none mix-blend-screen"
                style={{
                    background: "radial-gradient(circle at 30% 20%, rgba(56, 189, 248, 0.18) 0%, transparent 60%)"
                }}
            />

            {/* Left Column: RCIP Branding Sidebar (Desktop >= md only) */}
            <div className="mobile-hidden relative z-10 md:flex md:w-[55%] lg:w-[60%] h-full overflow-hidden flex-col justify-between pt-8 px-8 pb-3 lg:pt-12 lg:px-12 lg:pb-4 bg-gradient-to-br from-[#005AA2] via-[#003B70] to-[#002244] shadow-2xl">
                {/* Blueprint Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-40 pointer-events-none mix-blend-overlay"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
                        `,
                        backgroundSize: "32px 32px"
                    }}
                />

                {/* Subtle Radial Glow Overlay */}
                <div
                    className="absolute inset-0 pointer-events-none mix-blend-screen"
                    style={{
                        background: "radial-gradient(circle at 30% 30%, rgba(56, 189, 248, 0.15) 0%, transparent 60%)"
                    }}
                />

                {/* Top Logo */}
                <div className="relative z-20 flex items-center justify-between gap-2 select-none">
                    <img src={rcipBrandLogoUrl} alt="RCIP Logo" className="h-16 w-auto object-contain" />

                    <img src={corekeyLogoUrl} alt="Corekey Logo" className="h-14 md:h-18 lg:h-20 max-w-[160px] w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Center Content */}
                <div className="flex flex-col justify-center items-center text-center my-auto mx-auto max-w-xl">

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                        Regulatory Compliance <br />
                        Intelligence Platform
                    </h2>
                    <p className="text-blue-100/80 text-sm md:text-base font-light leading-relaxed mb-8">
                        Streamlined compliance management for real estate projects.
                    </p>
                </div>

                {/* Footer of Left Column */}
                <div className="relative z-20 mt-auto pt-4 border-t border-white/10 flex flex-col items-center gap-3 w-full">
                    {/* Brand Logos */}
                    <div className="flex items-center justify-between w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%] select-none bg-white py-3.5 px-6 sm:px-8 shadow-md rounded-xl border border-slate-100/80">
                        <img src={caLogoUrl} alt="CA Logo" className="h-6 sm:h-7 md:h-8 w-auto object-contain opacity-90 hover:opacity-100 transition-all duration-300" />
                        <img src={vannaLogoUrl} alt="Vanna Logo" className="h-[16px] sm:h-[20px] md:h-[24px] w-auto object-contain opacity-90 hover:opacity-100 transition-all duration-300" />
                        <img src={cliffLogoUrl} alt="Cliff Logo" className="h-6 sm:h-7 md:h-8 w-auto object-contain opacity-90 hover:opacity-100 transition-all duration-300" />
                    </div>
                    {/* Copyright Text */}
                    <div className="w-full text-center text-blue-200/60 text-xs font-light tracking-wide">
                        © 2026 RCIP. All rights reserved.
                        {/* Designed & Developed by Vanna */}
                    </div>
                </div>
            </div>

            {/* Right Column / Mobile Main: Login Panel */}
            <div className="relative z-10 flex-1 flex flex-col justify-between items-center w-full h-full py-2.5 px-3.5 md:pt-12 md:px-12 md:pb-4 md:bg-[#F4F6F9] dark:md:bg-[#0B0C10] overflow-y-auto md:overflow-y-auto">
                {/* Theme Toggle Button (Desktop only) */}
                <button
                    onClick={() => setIsDark(!isDark)}
                    className="mobile-hidden absolute top-6 right-6 z-50 p-2 rounded-full bg-white dark:bg-slate-800 text-slate-800 dark:text-gray-200 shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                    aria-label="Toggle Dark Mode"
                >
                    {isDark ? "🌙" : "☀️"}
                </button>

                {/* Mobile Header Logos (< md only) */}
                <div className="desktop-hidden w-full max-w-sm mx-auto flex items-center justify-between gap-2 pt-1 pb-2 select-none shrink-0">
                    <img src={rcipBrandLogoUrl} alt="RCIP Logo" className="h-9 w-auto object-contain" />
                    <img
                        src={corekeyLogoUrl}
                        alt="Corekey Logo"
                        className="h-8 max-w-[130px] w-auto object-contain opacity-95"
                    />
                </div>

                {/* Content Container / Card */}
                <div className="w-full max-w-sm md:max-w-md mx-auto my-auto relative z-10 shrink-0 md:shrink">
                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-10">
                        {/* Language Selector */}
                        {enabledLanguages.length > 1 && (
                            <div className="flex justify-end mb-2 sm:mb-4">
                                <div id="kc-locale-wrapper" className="relative group">
                                    <button
                                        className="text-[11px] sm:text-xs font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 flex items-center gap-1 focus:outline-none"
                                        id="kc-current-locale-link"
                                    >
                                        {currentLanguage.label}
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <ul className="absolute right-0 mt-1 hidden group-hover:block bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-1 z-50 min-w-[120px]">
                                        {enabledLanguages.map(({ languageTag, label, href }: any) => (
                                            <li key={languageTag}>
                                                <a
                                                    className="block px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                                                    href={href}
                                                >
                                                    {label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Page Header (Welcome Back or dynamic title) */}
                        {(() => {
                            const isLoginPage = kcContext.pageId === "login.ftl";
                            if (isLoginPage) {
                                return (
                                    <div className="mb-3 md:mb-6">
                                        <h1 className="text-xl md:text-3xl font-bold text-slate-800 dark:text-white tracking-tight">Welcome Back</h1>
                                        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5 md:mt-1.5 leading-relaxed">
                                            Sign in to access your compliance dashboard
                                        </p>
                                    </div>
                                );
                            }

                            // Dynamic fallback headers for register, reset password etc.
                            const node = !(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
                                <h1 id="kc-page-title" className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
                                    {headerNode}
                                </h1>
                            ) : (
                                <div id="kc-username" className={kcClsx("kcFormGroupClass")}>
                                    <label id="kc-attempted-username" className="text-slate-800 dark:text-white font-medium text-sm">
                                        {auth.attemptedUsername}
                                    </label>
                                    <a
                                        id="reset-login"
                                        href={url.loginRestartFlowUrl}
                                        aria-label={msgStr("restartLoginTooltip")}
                                        className="ml-2 text-[#0060A9] dark:text-blue-400 hover:underline"
                                    >
                                        <div className="kc-login-tooltip inline-flex items-center gap-1">
                                            <i className={kcClsx("kcResetFlowIcon")}></i>
                                            <span className="kc-tooltip-text text-xs">{msg("restartLoginTooltip")}</span>
                                        </div>
                                    </a>
                                </div>
                            );

                            return <div className="mb-3 sm:mb-4 lg:mb-6">{node}</div>;
                        })()}

                        {/* Messages / Alerts */}
                        <div id="kc-content">
                            <div id="kc-content-wrapper" className="w-full">
                                {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                                    <div
                                        className={clsx(
                                            "p-3 sm:p-4 rounded-xl mb-4 sm:mb-6 text-xs sm:text-sm flex gap-2.5 sm:gap-3",
                                            message.type === "success" &&
                                            "bg-emerald-50 text-emerald-800 border border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30",
                                            message.type === "warning" &&
                                            "bg-amber-50 text-amber-800 border border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30",
                                            message.type === "error" &&
                                            "bg-rose-50 text-rose-800 border border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30",
                                            message.type === "info" &&
                                            "bg-blue-50 text-blue-800 border border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30"
                                        )}
                                    >
                                        <div className="mt-0.5 shrink-0">
                                            {message.type === "success" && (
                                                <svg
                                                    className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            )}
                                            {message.type === "warning" && (
                                                <svg
                                                    className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                                    />
                                                </svg>
                                            )}
                                            {message.type === "error" && (
                                                <svg
                                                    className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 dark:text-rose-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            )}
                                            {message.type === "info" && (
                                                <svg
                                                    className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: kcSanitize(message.summary)
                                            }}
                                        />
                                    </div>
                                )}

                                {children}

                                {auth !== undefined && auth.showTryAnotherWayLink && (
                                    <form id="kc-select-try-another-way-form" action={url.loginAction} method="post" className="mt-3 sm:mt-4">
                                        <div className={kcClsx("kcFormGroupClass")}>
                                            <input type="hidden" name="tryAnotherWay" value="on" />
                                            <a
                                                href="#"
                                                id="try-another-way"
                                                className="text-xs sm:text-sm font-medium text-[#0060A9] dark:text-blue-400 hover:underline transition-colors"
                                                onClick={e => {
                                                    e.preventDefault();
                                                    document.forms["kc-select-try-another-way-form" as never].requestSubmit();
                                                }}
                                            >
                                                {msg("doTryAnotherWay")}
                                            </a>
                                        </div>
                                    </form>
                                )}

                                {socialProvidersNode && <div className="mt-4 sm:mt-6">{socialProvidersNode}</div>}

                                {displayInfo && infoNode && (
                                    <div id="kc-info" className="!mx-0 !mb-0 mt-3 md:mt-6 border-t border-slate-100 dark:border-slate-800 pt-2 md:pt-4">
                                        <div id="kc-info-wrapper">{infoNode}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Partner Logos Pill (mobile < md only) */}
                <div className="desktop-hidden w-full max-w-sm mx-auto mt-2 bg-white dark:bg-slate-900 py-2 px-4 shadow-md rounded-lg border border-slate-100/80 dark:border-slate-800 flex items-center justify-between select-none shrink-0">
                    <img src={caLogoUrl} alt="CA Logo" className="h-4 w-auto object-contain opacity-90" />
                    <img src={vannaLogoUrl} alt="Vanna Logo" className="h-[12px] w-auto object-contain opacity-90" />
                    <img src={cliffLogoUrl} alt="Cliff Logo" className="h-4 w-auto object-contain opacity-90" />
                </div>

                {/* Footer: Restricted Access Warning & Support Links */}
                <div className="mt-auto flex flex-col items-center gap-1 md:gap-2 text-center pt-2 md:pt-6 pb-1 md:pb-0 w-full max-w-sm md:max-w-md mx-auto shrink-0 md:shrink">
                    <div className="flex items-center gap-1 md:gap-1.5 text-[10px] md:text-xs text-blue-100/90 dark:text-slate-400 md:text-slate-500 font-medium">
                        <svg
                            className="w-3 md:w-3.5 h-3 md:h-3.5 text-blue-200 dark:text-slate-500 md:text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="2.2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                        <span>Access restricted to authorized compliance personnel only.</span>
                    </div>
                    <div className="flex gap-3 md:gap-4 text-[10px] md:text-xs font-semibold text-blue-200 hover:text-white dark:text-blue-400 md:text-[#0060A9]">
                        <a href={`${redirectDomain}/terms`} className="hover:underline" target="_blank" rel="noopener noreferrer">
                            Terms of Service
                        </a>
                        <span className="text-blue-300/40 dark:text-slate-700 md:text-slate-300 select-none">•</span>
                        <a href={`${redirectDomain}/privacy-policy`} className="hover:underline" target="_blank" rel="noopener noreferrer">
                            Privacy Policy
                        </a>
                    </div>
                    <div className="text-[9px] md:text-[10px] text-blue-200/80 dark:text-slate-500 md:text-slate-500 font-medium tracking-wide">
                        Designed & Developed by{" "}
                        <a
                            href="https://vannainfotech.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:underline dark:text-blue-400 md:text-[#299DD0] font-semibold"
                        >
                            Vanna Information Technologies
                        </a>
                    </div>
                    {/* Mobile Copyright */}
                    <div className="desktop-hidden text-[9px] text-blue-200/60 dark:text-slate-600 font-light tracking-wide">
                        © 2026 RCIP. All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    );
}
