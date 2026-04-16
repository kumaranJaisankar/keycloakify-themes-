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
import studentLoginLottieUrl from "./assets/img/student-login.lottie";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


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
        <div className="h-screen w-full bg-white dark:bg-slate-950 flex flex-col md:flex-row overflow-hidden font-sans">

            {/* <div className="kc-split-layout bg-slate-50 dark:bg-[#0B0C10] text-slate-900 dark:text-white font-sans"> */}
            {/* Left Column - Glow & Orbit */}

            {/* Left Section: Hero Orbital (60% Width) */}
            <div className="relative w-full md:w-[65%] h-[40%] md:h-full bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center p-8 overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full" />
                    <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full" />
                </div>

                <div className="relative w-full max-w-lg aspect-square">
                    <DotLottieReact
                        src={studentLoginLottieUrl}
                        loop
                        autoplay
                    />
                </div>
            </div>

            {/* Right Column - Login */}
            <div className="kc-right-column relative">
                {/* Theme Toggle Button */}
                <button
                    onClick={() => setIsDark(!isDark)}
                    className="absolute top-6 right-6 z-50 p-2 rounded-full bg-slate-200 dark:bg-gray-800 text-slate-800 dark:text-gray-200 shadow-sm border border-slate-300 dark:border-gray-700 hover:bg-slate-300 dark:hover:bg-gray-700 transition"
                    aria-label="Toggle Dark Mode"
                >
                    {isDark ? "🌙" : "☀️"}
                </button>
                <div className=" flex flex-row items-center gap-2 absolute top-2 left-0 z-50 p-2 rounded-full text-slate-800 dark:text-gray-200 "
                >
                    <img src={livePoisedLogoPngUrl} alt="Logo" className="w-30 h-14" />
                </div>
                {/* Content Container */}
                <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-12 xl:px-10 py-10 pt-20">

                    {/* Marketing Copy Removed by Request */}

                    {/* KC Form */}
                    <div className="w-full max-w-md mx-auto lg:mx-0">
                        <div className={kcClsx("kcFormCardClass")}>
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

                {/* Footer */}
                <div className="px-8 sm:px-16 lg:px-24 xl:px-32 py-6 border-t border-indigo-500/10 mt-auto">
                    <p className="text-gray-500 text-xs font-medium text-center lg:text-left">
                        Iyota Prep v1.0.4 <span className="mx-2 hidden sm:inline">•</span><br className="sm:hidden" /> © 2026 Iyota Prep Inc.
                    </p>
                </div>
            </div>
        </div>
    );
}
