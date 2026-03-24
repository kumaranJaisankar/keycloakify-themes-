import { useEffect, useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import livePoisedLogoPngUrl from "./assets/img/iyotaprep-logo.svg";

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
        <div className="kc-split-layout bg-slate-50 dark:bg-[#0B0C10] text-slate-900 dark:text-white font-sans">
            {/* Left Column - Glow & Orbit */}
            <div className="kc-left-column border-r border-slate-200 dark:border-indigo-500/10 bg-slate-100/50 dark:bg-transparent">
                {/* Background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-[100px] dark:blur-[120px] pointer-events-none" />

                {/* Orbit Circles */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] border border-slate-300 dark:border-indigo-500/20 rounded-full border-dashed border-1 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] border border-slate-300/50 dark:border-indigo-500/20 rounded-full border-dashed border-2  pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-slate-300 dark:border-indigo-500/20 rounded-full border-dashed border-2 pointer-events-none" />

                {/* Outer Orbit (650px) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] pointer-events-none">
                    <div className="w-full h-full rounded-full animate-[spin_40s_linear_infinite]">
                        {/* Top Edge */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                            <div className="w-20 h-20 flex items-center justify-center p-4 text-indigo-500 dark:text-indigo-400 p-3 bg-white/80 dark:bg-indigo-950/40 rounded-full border border-slate-200 dark:border-indigo-500/20 shadow-md dark:shadow-none backdrop-blur-md animate-[spin_40s_linear_infinite_reverse]">
                                <svg fill="#1d70bf" height="50" width="50" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="-61.2 -61.2 734.40 734.40" stroke="#1d70bf" stroke-width="4.896"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="15.912"> <g> <g> <circle cx="306" cy="306.211" r="62.185"></circle> <path d="M534.101,337.23c-7.888-10.304-16.733-20.673-26.417-31.019c9.685-10.345,18.529-20.714,26.417-31.019 c18.542-24.221,31.031-47.054,37.122-67.866c4.9-16.74,7.995-41.128-5.084-62.243c-17.681-28.546-53.763-34.538-80.918-34.538 c-22.832,0-48.908,4.001-76.949,11.542c-2.767-9.134-5.748-17.92-8.945-26.293c-10.877-28.487-23.747-51.157-38.253-67.276 C344.346,9.932,325.123,0,305.483,0h-0.126c-24.837,0-43.908,15.665-55.532,28.67c-14.452,16.167-27.239,38.936-38.007,67.475 c-3.102,8.221-5.992,16.838-8.677,25.787c-27.819-7.438-53.689-11.383-76.362-11.383c-27.156,0-63.238,5.995-80.918,34.541 c-13.078,21.115-9.984,45.51-5.084,62.25c6.091,20.812,18.581,43.66,37.122,67.88c7.884,10.298,16.723,20.664,26.402,31.005 c-9.679,10.339-18.518,20.703-26.402,31.001c-18.541,24.221-31.031,47.054-37.122,67.866c-4.899,16.74-7.995,41.128,5.084,62.243 c17.681,28.546,53.763,34.538,80.918,34.538c22.841,0,48.926-4.005,76.98-11.55c2.759,9.096,5.729,17.847,8.915,26.191 c10.876,28.486,23.747,51.05,38.252,67.169C267.652,602.272,286.874,612,306.513,612h0.13c24.838,0,43.908-15.468,55.533-28.472 c14.452-16.167,27.239-38.739,38.006-67.278c3.087-8.184,5.965-16.76,8.641-25.667c27.831,7.453,53.715,11.409,76.398,11.409 c0.003,0,0.003,0,0.006,0c27.154,0,63.233-6.052,80.912-34.596c13.078-21.115,9.984-45.56,5.084-62.301 C565.133,384.283,552.643,361.451,534.101,337.23z M485.221,145.319c14.999,0,41.615,2.348,51.357,18.075 c11.01,17.776-0.237,51.668-30.087,90.661c-7.007,9.153-14.857,18.377-23.438,27.598c-16.209-15.153-34.084-30.093-53.288-44.532 c-2.646-28.615-6.9-55.991-12.643-81.374C442.553,148.889,465.693,145.319,485.221,145.319z M384.282,446.482 c-0.293-0.104-0.585-0.204-0.879-0.308c-12.664-4.488-25.604-9.645-38.679-15.399c9.391-5.288,18.78-10.831,28.133-16.624 c6.506-4.029,12.915-8.132,19.223-12.297C389.993,417.319,387.384,432.241,384.282,446.482z M354.546,384.59 c-16.005,9.913-32.282,19.152-48.565,27.593c-16.271-8.447-32.535-17.688-48.528-27.593c-14.5-8.981-28.486-18.32-41.854-27.909 c-1.148-16.409-1.759-33.215-1.794-50.276c-0.036-17.14,0.509-34.03,1.598-50.523c13.427-9.638,27.479-19.024,42.051-28.05 c15.995-9.907,32.262-19.141,48.535-27.578c16.281,8.442,32.555,17.68,48.559,27.592c14.503,8.983,28.49,18.323,41.86,27.914 c1.144,16.389,1.753,33.171,1.789,50.204c0.036,17.162-0.51,34.069-1.602,50.577C383.167,366.18,369.117,375.565,354.546,384.59z M228.186,446.26c-3.112-14.074-5.745-28.815-7.871-44.085c6.181,4.075,12.459,8.09,18.828,12.035 c9.318,5.772,18.672,11.295,28.028,16.567c-13.04,5.727-25.946,10.865-38.575,15.34 C228.459,446.164,228.323,446.211,228.186,446.26z M179.397,328.843c-9.042-7.469-17.666-15.028-25.836-22.632 c8.144-7.582,16.742-15.117,25.754-22.564c-0.202,7.552-0.3,15.157-0.283,22.805C179.048,313.96,179.171,321.427,179.397,328.843z M227.686,165.994c0.304,0.107,0.606,0.211,0.91,0.319c12.646,4.481,25.569,9.626,38.626,15.364 c-9.373,5.279-18.744,10.812-28.079,16.594c-6.509,4.032-12.922,8.137-19.234,12.304 C221.99,195.128,224.592,180.221,227.686,165.994z M383.838,166.154c3.114,14.1,5.746,28.868,7.871,44.168 c-6.188-4.08-12.474-8.1-18.851-12.05c-9.339-5.784-18.713-11.319-28.09-16.6c13.061-5.738,25.987-10.884,38.637-15.367 C383.548,166.254,383.692,166.205,383.838,166.154z M432.605,283.601c9.036,7.466,17.656,15.021,25.82,22.621 c-8.141,7.578-16.735,15.11-25.743,22.554c0.204-7.57,0.301-15.193,0.285-22.859C432.952,298.435,432.83,290.993,432.605,283.601z M244.352,108.433c17.335-45.946,40.167-73.402,61.13-73.446c20.905,0,43.843,27.363,61.359,73.239 c2.93,7.676,5.665,15.739,8.208,24.129c-22.348,7.764-45.552,17.479-69.052,28.944c-23.702-11.564-47.101-21.344-69.626-29.14 C238.844,123.915,241.502,115.986,244.352,108.433z M75.422,163.394c9.741-15.727,36.358-18.075,51.357-18.075 c19.402,0,42.367,3.526,67.605,10.3c-5.685,25.476-9.86,52.962-12.408,81.697c-19.106,14.379-36.893,29.252-53.028,44.337 c-8.581-9.221-16.43-18.445-23.437-27.598C75.659,215.063,64.412,181.171,75.422,163.394z M126.778,467.103 c-14.999,0-41.615-2.348-51.356-18.075c-11.01-17.776,0.237-51.669,30.087-90.662c7.001-9.146,14.845-18.363,23.418-27.577 c16.217,15.167,34.103,30.121,53.32,44.574c2.65,28.594,6.906,55.945,12.652,81.306 C169.459,463.531,146.313,467.103,126.778,467.103z M367.647,503.885c-17.335,45.946-40.167,73.342-61.077,73.342h-0.049 c-20.908,0-43.847-27.292-61.363-73.167c-2.917-7.639-5.639-15.662-8.172-24.006c22.315-7.754,45.482-17.453,68.945-28.897 c23.707,11.576,47.113,21.369,69.645,29.179C373.118,488.516,370.477,496.385,367.647,503.885z M536.578,449.086 c-9.741,15.727-36.353,18.133-51.351,18.133c-0.001,0-0.003,0-0.004,0c-19.409,0-42.382-3.553-67.629-10.346 c5.693-25.495,9.874-53.004,12.426-81.763c19.102-14.376,36.886-29.246,53.02-44.328c8.586,9.227,16.441,18.456,23.451,27.614 C536.341,397.388,547.588,431.309,536.578,449.086z"></path> </g> </g> </g><g id="SVGRepo_iconCarrier"> <g> <g> <circle cx="306" cy="306.211" r="62.185"></circle> <path d="M534.101,337.23c-7.888-10.304-16.733-20.673-26.417-31.019c9.685-10.345,18.529-20.714,26.417-31.019 c18.542-24.221,31.031-47.054,37.122-67.866c4.9-16.74,7.995-41.128-5.084-62.243c-17.681-28.546-53.763-34.538-80.918-34.538 c-22.832,0-48.908,4.001-76.949,11.542c-2.767-9.134-5.748-17.92-8.945-26.293c-10.877-28.487-23.747-51.157-38.253-67.276 C344.346,9.932,325.123,0,305.483,0h-0.126c-24.837,0-43.908,15.665-55.532,28.67c-14.452,16.167-27.239,38.936-38.007,67.475 c-3.102,8.221-5.992,16.838-8.677,25.787c-27.819-7.438-53.689-11.383-76.362-11.383c-27.156,0-63.238,5.995-80.918,34.541 c-13.078,21.115-9.984,45.51-5.084,62.25c6.091,20.812,18.581,43.66,37.122,67.88c7.884,10.298,16.723,20.664,26.402,31.005 c-9.679,10.339-18.518,20.703-26.402,31.001c-18.541,24.221-31.031,47.054-37.122,67.866c-4.899,16.74-7.995,41.128,5.084,62.243 c17.681,28.546,53.763,34.538,80.918,34.538c22.841,0,48.926-4.005,76.98-11.55c2.759,9.096,5.729,17.847,8.915,26.191 c10.876,28.486,23.747,51.05,38.252,67.169C267.652,602.272,286.874,612,306.513,612h0.13c24.838,0,43.908-15.468,55.533-28.472 c14.452-16.167,27.239-38.739,38.006-67.278c3.087-8.184,5.965-16.76,8.641-25.667c27.831,7.453,53.715,11.409,76.398,11.409 c0.003,0,0.003,0,0.006,0c27.154,0,63.233-6.052,80.912-34.596c13.078-21.115,9.984-45.56,5.084-62.301 C565.133,384.283,552.643,361.451,534.101,337.23z M485.221,145.319c14.999,0,41.615,2.348,51.357,18.075 c11.01,17.776-0.237,51.668-30.087,90.661c-7.007,9.153-14.857,18.377-23.438,27.598c-16.209-15.153-34.084-30.093-53.288-44.532 c-2.646-28.615-6.9-55.991-12.643-81.374C442.553,148.889,465.693,145.319,485.221,145.319z M384.282,446.482 c-0.293-0.104-0.585-0.204-0.879-0.308c-12.664-4.488-25.604-9.645-38.679-15.399c9.391-5.288,18.78-10.831,28.133-16.624 c6.506-4.029,12.915-8.132,19.223-12.297C389.993,417.319,387.384,432.241,384.282,446.482z M354.546,384.59 c-16.005,9.913-32.282,19.152-48.565,27.593c-16.271-8.447-32.535-17.688-48.528-27.593c-14.5-8.981-28.486-18.32-41.854-27.909 c-1.148-16.409-1.759-33.215-1.794-50.276c-0.036-17.14,0.509-34.03,1.598-50.523c13.427-9.638,27.479-19.024,42.051-28.05 c15.995-9.907,32.262-19.141,48.535-27.578c16.281,8.442,32.555,17.68,48.559,27.592c14.503,8.983,28.49,18.323,41.86,27.914 c1.144,16.389,1.753,33.171,1.789,50.204c0.036,17.162-0.51,34.069-1.602,50.577C383.167,366.18,369.117,375.565,354.546,384.59z M228.186,446.26c-3.112-14.074-5.745-28.815-7.871-44.085c6.181,4.075,12.459,8.09,18.828,12.035 c9.318,5.772,18.672,11.295,28.028,16.567c-13.04,5.727-25.946,10.865-38.575,15.34 C228.459,446.164,228.323,446.211,228.186,446.26z M179.397,328.843c-9.042-7.469-17.666-15.028-25.836-22.632 c8.144-7.582,16.742-15.117,25.754-22.564c-0.202,7.552-0.3,15.157-0.283,22.805C179.048,313.96,179.171,321.427,179.397,328.843z M227.686,165.994c0.304,0.107,0.606,0.211,0.91,0.319c12.646,4.481,25.569,9.626,38.626,15.364 c-9.373,5.279-18.744,10.812-28.079,16.594c-6.509,4.032-12.922,8.137-19.234,12.304 C221.99,195.128,224.592,180.221,227.686,165.994z M383.838,166.154c3.114,14.1,5.746,28.868,7.871,44.168 c-6.188-4.08-12.474-8.1-18.851-12.05c-9.339-5.784-18.713-11.319-28.09-16.6c13.061-5.738,25.987-10.884,38.637-15.367 C383.548,166.254,383.692,166.205,383.838,166.154z M432.605,283.601c9.036,7.466,17.656,15.021,25.82,22.621 c-8.141,7.578-16.735,15.11-25.743,22.554c0.204-7.57,0.301-15.193,0.285-22.859C432.952,298.435,432.83,290.993,432.605,283.601z M244.352,108.433c17.335-45.946,40.167-73.402,61.13-73.446c20.905,0,43.843,27.363,61.359,73.239 c2.93,7.676,5.665,15.739,8.208,24.129c-22.348,7.764-45.552,17.479-69.052,28.944c-23.702-11.564-47.101-21.344-69.626-29.14 C238.844,123.915,241.502,115.986,244.352,108.433z M75.422,163.394c9.741-15.727,36.358-18.075,51.357-18.075 c19.402,0,42.367,3.526,67.605,10.3c-5.685,25.476-9.86,52.962-12.408,81.697c-19.106,14.379-36.893,29.252-53.028,44.337 c-8.581-9.221-16.43-18.445-23.437-27.598C75.659,215.063,64.412,181.171,75.422,163.394z M126.778,467.103 c-14.999,0-41.615-2.348-51.356-18.075c-11.01-17.776,0.237-51.669,30.087-90.662c7.001-9.146,14.845-18.363,23.418-27.577 c16.217,15.167,34.103,30.121,53.32,44.574c2.65,28.594,6.906,55.945,12.652,81.306 C169.459,463.531,146.313,467.103,126.778,467.103z M367.647,503.885c-17.335,45.946-40.167,73.342-61.077,73.342h-0.049 c-20.908,0-43.847-27.292-61.363-73.167c-2.917-7.639-5.639-15.662-8.172-24.006c22.315-7.754,45.482-17.453,68.945-28.897 c23.707,11.576,47.113,21.369,69.645,29.179C373.118,488.516,370.477,496.385,367.647,503.885z M536.578,449.086 c-9.741,15.727-36.353,18.133-51.351,18.133c-0.001,0-0.003,0-0.004,0c-19.409,0-42.382-3.553-67.629-10.346 c5.693-25.495,9.874-53.004,12.426-81.763c19.102-14.376,36.886-29.246,53.02-44.328c8.586,9.227,16.441,18.456,23.451,27.614 C536.341,397.388,547.588,431.309,536.578,449.086z"></path> </g> </g> </g></svg> </div>
                        </div>
                        {/* Right Edge */}
                        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                            <div className="text-emerald-500 dark:text-emerald-400 p-3 bg-white/80 dark:bg-emerald-950/40 rounded-full border border-slate-200 dark:border-emerald-500/20 shadow-md dark:shadow-none backdrop-blur-md animate-[spin_40s_linear_infinite_reverse]">
                                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" /><line x1="8" x2="16" y1="6" y2="6" /><line x1="16" x2="16" y1="14" y2="18" /><path d="M16 10h.01" /><path d="M12 10h.01" /><path d="M8 10h.01" /><path d="M12 14h.01" /><path d="M8 14h.01" /><path d="M12 18h.01" /><path d="M8 18h.01" /></svg>
                            </div>
                        </div>
                        {/* Bottom Edge */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 pointer-events-auto">
                            <div className="text-blue-500 dark:text-blue-400 p-3 bg-white/80 dark:bg-blue-950/40 rounded-full border border-slate-200 dark:border-blue-500/20 shadow-md dark:shadow-none backdrop-blur-md animate-[spin_40s_linear_infinite_reverse]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Inner Orbit (450px) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] pointer-events-none">
                    <div className="w-full h-full rounded-full animate-[spin_25s_linear_infinite_reverse]">
                        {/* Top Edge */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                            <div className="text-pink-500 dark:text-pink-400 p-3 bg-white/80 dark:bg-pink-950/40 rounded-full border border-slate-200 dark:border-pink-500/20 shadow-md dark:shadow-none backdrop-blur-md animate-[spin_25s_linear_infinite]">
                                <svg fill="#bf3ed0" height="35" width="35" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 496" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M429.56,290.888l45.584-19.536l-6.296-14.704l-47.352,20.296c-7.68-11.08-17.456-20.592-28.752-27.976l22.104-36.848 l-13.72-8.232l-22.44,37.392C365.656,235.368,351.232,232,336,232h-2.408l33.4-60.12l-13.984-7.768l-37.144,66.864 c-16.384-2.512-31.128-9.976-42.672-20.864l20.464-20.464l-11.312-11.312l-19.672,19.672C253.464,184.984,248,169.128,248,152 c0-0.408-0.056-0.808-0.064-1.216l41.376-6.896l-2.624-15.784l-40.312,6.72c-1.816-10.008-5.128-19.496-9.792-28.176l55-27.496 l-7.16-14.312L227.72,93.192c-4.528-5.824-9.672-11.136-15.4-15.784l25.936-32.416l-12.504-10l-26.72,33.4 c-6.84-3.864-14.216-6.864-21.96-8.96l6.776-33.864l-15.688-3.136l-6.808,34.04C158.272,56.176,155.152,56,152,56 c-8.304,0-16.312,1.168-24,3.16V0h-16v64.84c-4.336,2-8.52,4.272-12.488,6.872l-37.36-44.84L49.848,37.128l37.08,44.496 c-4.68,4.328-8.92,9.096-12.664,14.272L52.44,81.344l-8.872,13.312L66,109.608c-4.072,8.216-6.984,17.064-8.552,26.392H0v16h56v8 c0,5.824,0.24,11.592,0.592,17.328l-34.16,6.832l3.144,15.688l32.488-6.496c1.32,11.088,3.288,21.984,5.872,32.64l-50.12,14.32 l4.392,15.392l49.92-14.264c2.072,6.808,4.44,13.48,7.008,20.064L20.44,288.856l7.16,14.312l53.8-26.896 c3.872,8.456,8.152,16.68,12.824,24.664l-42.64,28.424l8.872,13.312l42.208-28.144c5.664,8.528,11.768,16.728,18.304,24.568 L99.576,353.36l8.872,13.312l23.24-15.496c5.608,5.992,11.456,11.76,17.568,17.24l-35.392,42.472l12.296,10.248l35.336-42.4 c6.504,5.2,13.216,10.128,20.168,14.736l-36.44,58.296l13.56,8.488l36.464-58.344c9.096,5.312,18.512,10.136,28.216,14.416 l-15.056,45.16l15.168,5.064l14.72-44.152c10.36,3.872,21.024,7.104,31.912,9.744l-6.064,30.312l15.688,3.144l6.032-30.152 c8.584,1.56,17.296,2.728,26.128,3.488V496h16v-56.2c2.672,0.072,5.328,0.2,8.008,0.2c10.056,0,19.752-1.512,28.96-4.184 l19.88,39.768l14.312-7.16l-19.16-38.32c6.504-3.056,12.624-6.752,18.312-11.032L417.6,444.8l12.8-9.592l-20.008-26.672 c4.664-4.784,8.864-10.008,12.552-15.616l44.624,29.744l8.872-13.312l-45.776-30.52c3.824-8.408,6.512-17.408,7.976-26.824H496 v-16h-56C440,319.824,436.176,304.56,429.56,290.888z M336,424C190.432,424,72,305.568,72,160v-8c0-44.112,35.888-80,80-80 s80,35.888,80,80c0,52.936,43.064,96,96,96h8c48.52,0,88,39.48,88,88C424,384.52,384.52,424,336,424z"></path> <path d="M160,192c26.472,0,48-21.528,48-48s-21.528-48-48-48s-48,21.528-48,48S133.528,192,160,192z M160,112 c17.648,0,32,14.352,32,32s-14.352,32-32,32s-32-14.352-32-32S142.352,112,160,112z"></path> <path d="M144,232c-13.232,0-24,10.768-24,24s10.768,24,24,24s24-10.768,24-24S157.232,232,144,232z M144,264 c-4.416,0-8-3.584-8-8c0-4.416,3.584-8,8-8s8,3.584,8,8C152,260.416,148.416,264,144,264z"></path> <path d="M224,312c-17.648,0-32,14.352-32,32s14.352,32,32,32s32-14.352,32-32S241.648,312,224,312z M224,360 c-8.824,0-16-7.176-16-16c0-8.824,7.176-16,16-16c8.824,0,16,7.176,16,16C240,352.824,232.824,360,224,360z"></path> <path d="M272,248c-13.232,0-24,10.768-24,24s10.768,24,24,24s24-10.768,24-24S285.232,248,272,248z M272,280 c-4.416,0-8-3.584-8-8c0-4.416,3.584-8,8-8c4.416,0,8,3.584,8,8C280,276.416,276.416,280,272,280z"></path> <path d="M352,304c-17.648,0-32,14.352-32,32s14.352,32,32,32s32-14.352,32-32S369.648,304,352,304z M352,352 c-8.824,0-16-7.176-16-16c0-8.824,7.176-16,16-16c8.824,0,16,7.176,16,16C368,344.824,360.824,352,352,352z"></path> <path d="M480,96v-1.896c0-5.584-0.616-11.032-1.736-16.288l13.312-6.656l-7.16-14.312l-11.192,5.6 c-3.456-7.752-8.16-14.816-13.824-21L484.8,22.4l-9.6-12.8l-28,21c-4.256-3.048-8.808-5.68-13.64-7.832l5.6-11.192l-14.312-7.16 l-6.656,13.312C412.928,16.616,407.488,16,401.896,16H400V0h-16v16.808c-4.408,0.896-8.464,2.656-12.216,4.872l-4.632-9.256 l-14.312,7.16l6.648,13.288c-2.816,3.944-4.864,8.416-6.104,13.24l-23.448-5.872l-3.872,15.52l26.584,6.648 c0.744,4.592,2.304,8.864,4.48,12.792l-15.656,5.216l5.064,15.168l22.016-7.336c3.08,2.248,6.488,4,10.136,5.304l-9.344,14.016 l13.312,8.872l12.976-19.456c2.56,1.328,4.368,3.928,4.368,7.016c0,5.328,1.096,10.4,2.992,15.056l-15.432,10.288l8.872,13.312 l15.416-10.28c3.48,3.448,7.6,6.24,12.144,8.232V176h16v-32c6.032,0,11.704-1.44,16.84-3.848l17.504,17.504l11.312-11.312 l-15.888-15.888c4.6-5.168,7.992-11.432,9.424-18.456H496V96H480z M464,104c0,13.232-10.768,24-24,24s-24-10.768-24-24 s-10.768-24-24-24s-24-10.768-24-24s10.768-24,24-24h9.896C436.144,32,464,59.856,464,94.104V104z"></path> </g> </g> </g> </g></svg>  </div>
                        </div>
                        {/* Bottom Edge */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 pointer-events-auto">
                            <div className="text-orange-500 dark:text-orange-400 p-3 bg-white/80 dark:bg-orange-950/40 rounded-full border border-slate-200 dark:border-orange-500/20 shadow-md dark:shadow-none backdrop-blur-md animate-[spin_25s_linear_infinite]">
                                <svg fill="#e14747" width="30" height="30" viewBox="-3.2 -3.2 38.40 38.40" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M25.326 30.335l-5.325-6.302v-11.047h0.666c0.552 0 1-0.447 1-1s-0.448-1-1-1h-1.666c-0.552 0-1 0.447-1 1v12.432c0 0.248 0.092 0.486 0.258 0.67l4.074 4.917h-12.665l4.074-4.917c0.166-0.183 0.258-0.422 0.258-0.67v-12.432c0-0.553-0.447-1-1-1h-1.666c-0.553 0-1 0.447-1 1s0.447 1 1 1h0.666v11.047l-5.325 6.302c-0.264 0.293-0.332 0.715-0.172 1.076s0.519 0.594 0.914 0.594h17.167c0.395 0 0.753-0.233 0.914-0.594 0.16-0.361 0.093-0.783-0.172-1.076zM15 9.99c1.102 0 1.995-0.893 1.995-1.995 0-1.101-0.893-1.994-1.995-1.994s-1.995 0.894-1.995 1.994c0 1.102 0.893 1.995 1.995 1.995zM21.515 7.021c1.949 0 3.529-1.573 3.529-3.513s-1.579-3.513-3.529-3.513c-1.948 0-3.529 1.573-3.529 3.513s1.581 3.513 3.529 3.513zM21.499 1.989c0.833 0 1.511 0.675 1.511 1.504s-0.677 1.504-1.511 1.504-1.511-0.675-1.511-1.504c0-0.829 0.677-1.504 1.511-1.504z"></path> </g></svg></div>
                        </div>
                        {/* Left Edge */}
                        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                            <div className="w-10 h-10 flex items-center justify-center p-4 text-indigo-500 dark:text-indigo-300 p-2 bg-white/80 dark:bg-indigo-950/40 rounded-full border border-slate-200 dark:border-indigo-500/20 shadow-md dark:shadow-none backdrop-blur-md text-xs font-bold font-mono text-center leading-tight animate-[spin_25s_linear_infinite]">
                                01<br />10
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center Content */}
                <div className="relative bg-gradient-to-r from-orange-500/20 via-green-500/20 to-yellow-500/20 z-10 flex flex-col items-center justify-center w-[280px] h-[280px] bg-white dark:bg-[#131722] rounded-full border border-slate-200 dark:border-indigo-500/20 shadow-xl dark:shadow-[0_0_60px_-15px_rgba(79,70,229,0.3)] pointer-events-auto">
                    <img src={livePoisedLogoPngUrl} width={150} alt="IyotaPrep Logo" />
                    <h2 className="text-[1.75rem] font-extrabold bg-gradient-to-r from-orange-500 via-green-500 to-yellow-500 bg-clip-text text-transparent">
                        IyotaPrep
                    </h2>
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

                {/* Content Container */}
                <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-10 py-10">

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
                                        <h1 id="kc-page-title" className="!text-3xl !font-extrabold !text-slate-900 dark:!text-slate-100 !mb-6 !tracking-tight !text-center lg:!text-center">
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
