import { useEffect } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import livePoisedLogoPngUrl from "./assets/img/live_poised_logo_1.png";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        // headerNode,
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
    }, [documentTitle, msgStr, realm.displayName]);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? kcClsx("kcBodyClass")
    });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    return (
        <div className={kcClsx("kcLoginClass")}>
            <div className="login-card-container fade-in relative">
                {/* Language Selector - Positioned top right of the card */}
                {enabledLanguages.length > 1 && (
                    <div id="kc-locale" className={kcClsx("kcLocaleMainClass")}>
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
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
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

                {/* Visual Section */}
                <div className="visual-section flex items-center justify-center">
                    <div className="visual-pattern"></div>
                    
                    <div className="relative z-20 flex items-center justify-center w-full p-16">
                        <img 
                            src={livePoisedLogoPngUrl} 
                            className="w-full max-w-[300px] h-auto object-contain drop-shadow-2xl animate-pulse-slow" 
                            alt="Large Logo" 
                        />
                    </div>
                    
                    {/* Decorative Blobs */}
                    <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-200/10 blur-[100px] rounded-full"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200/10 blur-[100px] rounded-full"></div>
                </div>

                {/* Form Section */}
                <div className="form-section !w-1/2">
                    <header className="mb-4">
                        {/* Mobile Logo - Only visible on small screens */}
                        <img src={livePoisedLogoPngUrl} className="h-12 w-auto mb-8 mx-auto md:hidden" alt="Logo" />
                        
                        {(() => {
                            const node = !(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
                                <div className="space-y-0.5">
                                    <h1 id="kc-page-title" className="page-title dark:text-white">
                                      Welcome to <span className="text-teal-brand">LivePoised</span>
                                    </h1>
                                    <p className="page-subtitle !mb-2">
                                        Please sign in to your account
                                    </p>
                                </div>
                            ) : (
                                <div id="kc-username" className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <label id="kc-attempted-username" className="block text-sm font-semibold text-slate-900 dark:text-white">
                                            {auth.attemptedUsername}
                                        </label>
                                        <a id="reset-login" href={url.loginRestartFlowUrl} className="text-[10px] text-teal-600 hover:text-teal-700 font-medium tracking-tight">
                                            {msg("restartLoginTooltip")}
                                        </a>
                                    </div>
                                </div>
                            );

                            return node;
                        })()}
                    </header>

                    <div id="kc-content">
                        <div id="kc-content-wrapper">
                            {/* Alerts / Messages */}
                            {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                                <div className={clsx("kcAlertClass", `alert-${message.type}`, "py-2 px-3 mb-4")}>
                                    <div className="mt-0.5">
                                        {message.type === "success" && <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}
                                        {message.type === "warning" && <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>}
                                        {message.type === "error" && <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>}
                                        {message.type === "info" && <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>}
                                    </div>
                                    <span
                                        className="text-[13px] font-medium"
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(message.summary)
                                        }}
                                    />
                                </div>
                            )}

                            {/* Main Form Content */}
                            <div className="kc-form-container">
                                {children}
                            </div>

                            {/* Try another way link */}
                            {auth !== undefined && auth.showTryAnotherWayLink && (
                                <form id="kc-select-try-another-way-form" action={url.loginAction} method="post" className="mt-2">
                                    <input type="hidden" name="tryAnotherWay" value="on" />
                                    <a
                                        href="#"
                                        id="try-another-way"
                                        className="text-xs font-medium text-slate-500 hover:text-teal-600 transition-colors"
                                        onClick={() => {
                                            const form = document.forms["kc-select-try-another-way-form" as any];
                                            if (form) {
                                                form.requestSubmit();
                                            }
                                            return false;
                                        }}
                                    >
                                        {msg("doTryAnotherWay")}
                                    </a>
                                </form>
                            )}

                            {/* Social Providers */}
                            {socialProvidersNode && (
                                <div id="kc-social-providers" className="mt-6">
                                    {socialProvidersNode}
                                </div>
                            )}

                            {/* Sign up / Extra Info */}
                            {displayInfo && (
                                <div id="kc-info" className="mt-4 pt-0 border-none">
                                    <div id="kc-info-wrapper" className="text-sm text-slate-500 dark:text-slate-400">
                                        {infoNode}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
