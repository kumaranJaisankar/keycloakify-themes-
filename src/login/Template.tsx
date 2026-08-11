import { useEffect, useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import iyotaprepLogoUrl from "./assets/img/logo-icon.svg";


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
        let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
        if (link) {
            link.href = iyotaprepLogoUrl;
        }
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
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full bg-gradient-to-tr from-red-500/20 via-rose-500/10 to-transparent blur-[120px] animate-glow mix-blend-screen" />
                <div className="absolute top-1/4 -right-1/4 w-[400px] h-[400px] rounded-full bg-red-400/20 blur-[100px] animate-glow mix-blend-screen" style={{ animationDelay: '2s' }} />
                <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-red-600/20 blur-[100px] animate-glow mix-blend-screen" style={{ animationDelay: '4s' }} />
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
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-[#FF0000] to-rose-500 p-[1px]">
                                <div className="w-full h-full rounded-[11px] bg-white dark:bg-[#050505] flex items-center justify-center transition-colors duration-300">
                                    <svg viewBox="30 0 1210 1090" className="w-10 h-10 object-contain" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M 1228.941,251 C 1229.684,251 1230,336.042 1230,535.813 C 1230,630.751 1230,725.688 1230,820.626 C 1207.917,834.653 1185.833,848.681 1163.750,862.708 C 1127.312,885.853 1087.150,911.293 1074.500,919.240 C 1045.579,937.409 973.883,983.019 930,1011.165 C 895.318,1033.410 852.470,1060.680 833.724,1072.436 C 827.797,1076.153 822.314,1078.951 821.538,1078.653 C 819.673,1077.938 700.309,998.278 664,973.517 C 648.325,962.828 634.929,954.277 634.230,954.517 C 633.531,954.757 621.271,963.062 606.986,972.972 C 561.647,1004.426 452.762,1077.003 448.402,1078.676 C 447.646,1078.966 436.109,1072.237 422.764,1063.723 C 409.419,1055.209 373.300,1032.157 342.500,1012.495 C 275.662,969.828 228.823,940.162 76,843.706 C 60.325,833.813 45.517,824.362 43.094,822.704 C 41.625,821.699 40.158,820.695 38.689,819.690 C 38.905,810.825 39.122,801.960 39.338,793.095 C 39.695,778.468 39.989,650.513 39.993,508.750 C 39.997,334.343 40.329,251 41.019,251 C 41.580,251 64.192,262.411 91.269,276.358 C 118.346,290.305 162.325,312.864 189,326.488 C 215.675,340.112 253.025,359.246 272,369.008 C 314.815,391.036 362.690,415 363.880,415 C 364.837,415 386.073,383.067 435.702,307 C 467.342,258.505 501.500,206.846 570.594,103 C 592.002,70.825 615.093,36.030 621.908,25.677 C 633.804,7.605 634.369,6.927 636.054,8.677 C 637.019,9.680 648.177,26.329 660.849,45.675 C 673.521,65.021 698.855,103.271 717.145,130.675 C 748.507,177.664 803.971,261.734 871.217,364.213 C 887.561,389.121 902.031,410.849 903.371,412.498 C 904.183,413.497 904.995,414.497 905.807,415.496 C 912.422,412.116 919.039,408.736 925.654,405.356 C 936.569,399.779 967.325,384.083 994,370.478 C 1020.675,356.873 1061.175,336.178 1084,324.489 C 1182.887,273.849 1227.952,251 1228.941,251 Z M 126.479,382.370 C 125.172,382.871 125.025,406.375 125.247,578.702 C 125.331,643.956 125.416,709.210 125.500,774.464 C 130.167,777.445 134.833,780.427 139.500,783.408 C 154.743,793.146 185.432,812.655 250.500,853.972 C 321.710,899.189 364.863,926.666 406,952.983 C 427.725,966.881 446.034,978.458 446.686,978.709 C 447.338,978.960 467.363,965.917 491.186,949.726 C 515.009,933.535 539.112,917.229 544.750,913.491 C 550.388,909.753 555,906.155 555,905.494 C 555,904.370 514.488,774.401 389.752,795.484 C 372.503,784.156 355.254,772.828 338.005,761.500 C 338.027,716.053 338.049,670.607 338.071,625.160 C 338.131,501.359 337.990,488.714 336.539,487.660 C 335.660,487.022 325.842,481.913 314.721,476.307 C 303.600,470.701 257.030,447.143 211.232,423.957 C 163.964,400.026 127.322,382.047 126.479,382.370 Z M 750.250,880.998 C 730.862,893.841 715,904.880 715,905.528 C 715,906.176 718.263,908.868 722.250,911.511 C 726.237,914.154 749.916,930.230 774.868,947.235 C 799.820,964.240 820.857,978.391 821.615,978.682 C 822.373,978.973 828.958,975.410 836.247,970.764 C 873.604,946.953 938.959,905.142 957.474,893.208 C 969.009,885.773 989.484,872.719 1002.974,864.200 C 1016.464,855.681 1041.675,839.647 1059,828.567 C 1076.325,817.488 1102.531,800.790 1117.235,791.461 C 1126.147,785.807 1135.058,780.154 1143.970,774.500 C 1143.975,709.083 1143.980,643.667 1143.985,578.250 C 1143.999,398.974 1143.861,382 1142.399,382 C 1140.092,382 950.479,477.851 935.250,486.716 C 933.833,487.541 932.417,488.365 931,489.190 C 931,534.664 931,580.137 931,625.611 C 931,671.085 931,716.557 931,762.031 C 923.583,766.915 916.167,771.798 908.750,776.682 C 896.513,784.740 863.775,806.254 836,824.490 C 808.225,842.726 769.638,868.155 750.250,880.998 Z"
                                            className="fill-slate-900 dark:fill-white transition-colors duration-300"
                                            fillRule="evenodd"
                                        />
                                        <path
                                            d="M 424.750,521.007 C 423.095,521.001 423,526.469 423,621.901 C 423,655.535 423,689.168 423,722.802 C 434.250,730.097 445.500,737.393 456.750,744.688 C 475.312,756.725 507.968,777.807 529.317,791.537 C 550.666,805.267 574.405,820.617 582.070,825.649 C 591.426,831.791 596.252,834.420 596.753,833.649 C 597.752,832.112 598.267,631.803 597.276,630.406 C 596.849,629.804 585.700,622.417 572.500,613.990 C 517.454,578.848 500.510,568.081 482,556.482 C 471.275,549.762 454.400,539.032 444.500,532.638 C 434.600,526.244 425.712,521.011 424.750,521.007 Z M 677.045,627.477 C 675.363,628.329 673.682,629.182 672,630.034 C 672,664.009 672,697.983 672,731.958 C 672,797.674 672.349,834.098 672.983,834.490 C 673.524,834.824 680.386,830.865 688.233,825.693 C 717.532,806.381 754.980,782.001 769.500,772.786 C 777.750,767.550 793.807,757.161 805.182,749.699 C 816.557,742.237 830.282,733.339 835.682,729.925 C 841.082,726.511 845.725,723.519 846,723.276 C 846.672,722.682 847.011,523.996 846.344,521.678 C 846.047,520.646 845.225,520.084 844.448,520.382 C 843.694,520.671 830.348,529.183 814.789,539.298 C 751.119,580.689 681.778,625.079 677.045,627.477 Z"
                                            fill="#FF002B"
                                        />
                                        <path
                                            d="M 495.250,356.129 C 464.862,401.836 440,439.782 440,440.453 C 440,441.124 447.987,446.784 457.750,453.031 C 467.513,459.278 484.275,470.086 495,477.049 C 514.156,489.486 548.521,511.754 568.776,524.854 C 574.428,528.510 591.527,539.703 606.774,549.729 C 606.774,549.729 616.014,555.805 634.495,567.959 C 636.996,566.349 639.496,564.740 641.997,563.130 C 646.123,560.474 683.025,536.588 724,510.051 C 764.975,483.514 805.824,457.069 814.775,451.285 C 820.200,447.780 825.625,444.275 831.050,440.770 C 830.458,439.888 829.867,439.005 829.275,438.123 C 821.681,426.803 710.112,259.044 677.060,209.250 C 654.335,175.012 635.379,147 634.936,147 C 634.936,147 615.315,175.356 592.316,210.013 C 569.317,244.670 525.638,310.422 495.250,356.129 Z"
                                            fill="#FF002B"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-white/60 tracking-tight leading-tight pb-4 mb-2">
                            Astra
                        </h2>

                        {/* Status/Badge */}
                        {/* <div className="glass-panel px-6 py-2 mb-8 rounded-full opacity-0" style={{ animation: 'subtleZoomIn 1s ease-out 0.4s forwards' }}>
                            <p className="text-xs font-bold text-red-600 dark:text-red-300/80 tracking-[0.25em] uppercase whitespace-nowrap">
                                Admin & Faculty Portal
                            </p>
                        </div> */}

                        {/* Proverb/Quote */}
                        <div className="relative mt-2">
                            <span className="absolute -top-6 -left-5 text-6xl text-red-500/20 -rotate-[20deg] dark:text-red-500/30 font-serif leading-none select-none">"</span>
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-slate-600 dark:text-slate-300 italic tracking-wide leading-relaxed">
                                Imaginary <br className="hidden lg:block" />
                                <span className="font-semibold text-slate-800 dark:text-white relative inline-block mx-2">
                                    Isn't
                                    <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-[#FF0000] to-rose-500 rounded-full" />
                                </span> Impossible
                            </h3>
                            <span className="absolute -top-4 -right-5 text-6xl text-red-500/20 rotate-[20deg] dark:text-red-500/30 font-serif leading-none select-none">"</span>
                        </div>
                    </div>

                    {/* Bottom Space (Badge moved up) */}

                </div>
                {/* <div className=" flex flex-row items-center gap-2 absolute top-2 left-10 z-50 p-2 rounded-full text-slate-800 dark:text-gray-200 "
                >
                    <a href="https://iyotaprep.vannadev.com/explore" className="outline-none focus:outline-none"> <img src={livePoisedLogoPngUrl} alt="Logo" className="w-30 h-14" /></a>
                </div> */}
                {/* Footer placed strictly within Left Column */}
                <div className=" flex flex-row items-center gap-2 absolute bottom-2 left-50 z-50 p-2 rounded-full text-slate-800 dark:text-gray-200 ">
                    <p className="text-slate-600 dark:text-slate-400/80 text-xs font-medium tracking-wide">
                        Astra v1.0.4 <span className="mx-2 hidden sm:inline">•</span><br className="sm:hidden" /> © 2026 Astra Inc.
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
                                                    className="text-sm font-medium text-red-500 hover:text-red-400 transition-colors"
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
