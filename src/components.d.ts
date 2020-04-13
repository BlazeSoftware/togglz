/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { RouterHistory, } from "@stencil/router";
export namespace Components {
    interface AccountAddEnvironment {
        "close": () => Promise<void>;
        "reset": () => Promise<void>;
        "show": () => Promise<void>;
        "user": any;
    }
    interface AccountChangeEmail {
        "close": () => Promise<void>;
        "history": RouterHistory;
        "reset": () => Promise<void>;
        "show": () => Promise<void>;
        "user": any;
    }
    interface AccountChangeName {
        "close": () => Promise<void>;
        "reset": () => Promise<void>;
        "show": () => Promise<void>;
        "user": any;
    }
    interface AccountChangePassword {
        "close": () => Promise<void>;
        "reset": () => Promise<void>;
        "show": () => Promise<void>;
        "user": any;
    }
    interface AccountComplete {
        "history": RouterHistory;
    }
    interface AccountDashboard {
        "history": RouterHistory;
    }
    interface AccountDelete {
        "close": () => Promise<void>;
        "history": RouterHistory;
        "show": () => Promise<void>;
        "user": any;
    }
    interface AccountDeleteEnvironment {
        "close": () => Promise<void>;
        "reset": () => Promise<void>;
        "show": (environment: string) => Promise<void>;
        "user": any;
    }
    interface AccountDowngradePlan {
        "close": () => Promise<void>;
        "reset": () => Promise<void>;
        "show": () => Promise<void>;
        "user": any;
    }
    interface AccountEditEnvironment {
        "close": () => Promise<void>;
        "reset": () => Promise<void>;
        "show": (environment: any) => Promise<void>;
        "user": any;
    }
    interface AccountEnvironments {
        "history": RouterHistory;
    }
    interface AccountGenerateKey {
        "close": () => Promise<void>;
        "reset": () => Promise<void>;
        "show": () => Promise<void>;
        "user": any;
    }
    interface AccountJoin {
        "history": RouterHistory;
    }
    interface AccountLogin {
        "history": RouterHistory;
    }
    interface AccountLogout {
    }
    interface AccountManagement {
        "history": RouterHistory;
    }
    interface AccountOob {
        "history": RouterHistory;
    }
    interface AccountPlan {
        "history": RouterHistory;
    }
    interface AccountRecoverEmail {
        "history": RouterHistory;
    }
    interface AccountResetPassword {
        "history": RouterHistory;
    }
    interface AccountUpdatePassword {
        "history": RouterHistory;
    }
    interface AccountVerify {
        "history": RouterHistory;
    }
    interface AccountWebhook {
        "close": () => Promise<void>;
        "reset": () => Promise<void>;
        "show": (settings: any) => Promise<void>;
        "user": any;
    }
    interface ApiDocs {
        "history": RouterHistory;
    }
    interface AppBroken {
    }
    interface AppRoot {
        "history": RouterHistory;
    }
    interface ContactUs {
        "history": RouterHistory;
    }
    interface FeatureAdd {
        "close": () => Promise<void>;
        "reset": () => Promise<void>;
        "show": () => Promise<void>;
        "user": any;
    }
    interface FeatureDelete {
        "close": () => Promise<void>;
        "show": (featureSnapshot: any) => Promise<void>;
        "user": any;
    }
    interface FeatureEdit {
        "close": () => Promise<void>;
        "reset": () => Promise<void>;
        "show": (featureSnapshot: any) => Promise<void>;
        "user": any;
    }
    interface FeatureToggle {
        "featureSnapshot": any;
        "selectedEnvironment": string;
        "user": any;
    }
    interface HomePage {
    }
    interface HowToUse {
        "apiKey": string;
    }
    interface LoadingStatus {
        "status": string;
    }
    interface NavPage {
        "history": RouterHistory;
    }
    interface PageNotFound {
    }
    interface PricingOverview {
        "plan": string;
    }
}
declare global {
    interface HTMLAccountAddEnvironmentElement extends Components.AccountAddEnvironment, HTMLStencilElement {
    }
    var HTMLAccountAddEnvironmentElement: {
        prototype: HTMLAccountAddEnvironmentElement;
        new (): HTMLAccountAddEnvironmentElement;
    };
    interface HTMLAccountChangeEmailElement extends Components.AccountChangeEmail, HTMLStencilElement {
    }
    var HTMLAccountChangeEmailElement: {
        prototype: HTMLAccountChangeEmailElement;
        new (): HTMLAccountChangeEmailElement;
    };
    interface HTMLAccountChangeNameElement extends Components.AccountChangeName, HTMLStencilElement {
    }
    var HTMLAccountChangeNameElement: {
        prototype: HTMLAccountChangeNameElement;
        new (): HTMLAccountChangeNameElement;
    };
    interface HTMLAccountChangePasswordElement extends Components.AccountChangePassword, HTMLStencilElement {
    }
    var HTMLAccountChangePasswordElement: {
        prototype: HTMLAccountChangePasswordElement;
        new (): HTMLAccountChangePasswordElement;
    };
    interface HTMLAccountCompleteElement extends Components.AccountComplete, HTMLStencilElement {
    }
    var HTMLAccountCompleteElement: {
        prototype: HTMLAccountCompleteElement;
        new (): HTMLAccountCompleteElement;
    };
    interface HTMLAccountDashboardElement extends Components.AccountDashboard, HTMLStencilElement {
    }
    var HTMLAccountDashboardElement: {
        prototype: HTMLAccountDashboardElement;
        new (): HTMLAccountDashboardElement;
    };
    interface HTMLAccountDeleteElement extends Components.AccountDelete, HTMLStencilElement {
    }
    var HTMLAccountDeleteElement: {
        prototype: HTMLAccountDeleteElement;
        new (): HTMLAccountDeleteElement;
    };
    interface HTMLAccountDeleteEnvironmentElement extends Components.AccountDeleteEnvironment, HTMLStencilElement {
    }
    var HTMLAccountDeleteEnvironmentElement: {
        prototype: HTMLAccountDeleteEnvironmentElement;
        new (): HTMLAccountDeleteEnvironmentElement;
    };
    interface HTMLAccountDowngradePlanElement extends Components.AccountDowngradePlan, HTMLStencilElement {
    }
    var HTMLAccountDowngradePlanElement: {
        prototype: HTMLAccountDowngradePlanElement;
        new (): HTMLAccountDowngradePlanElement;
    };
    interface HTMLAccountEditEnvironmentElement extends Components.AccountEditEnvironment, HTMLStencilElement {
    }
    var HTMLAccountEditEnvironmentElement: {
        prototype: HTMLAccountEditEnvironmentElement;
        new (): HTMLAccountEditEnvironmentElement;
    };
    interface HTMLAccountEnvironmentsElement extends Components.AccountEnvironments, HTMLStencilElement {
    }
    var HTMLAccountEnvironmentsElement: {
        prototype: HTMLAccountEnvironmentsElement;
        new (): HTMLAccountEnvironmentsElement;
    };
    interface HTMLAccountGenerateKeyElement extends Components.AccountGenerateKey, HTMLStencilElement {
    }
    var HTMLAccountGenerateKeyElement: {
        prototype: HTMLAccountGenerateKeyElement;
        new (): HTMLAccountGenerateKeyElement;
    };
    interface HTMLAccountJoinElement extends Components.AccountJoin, HTMLStencilElement {
    }
    var HTMLAccountJoinElement: {
        prototype: HTMLAccountJoinElement;
        new (): HTMLAccountJoinElement;
    };
    interface HTMLAccountLoginElement extends Components.AccountLogin, HTMLStencilElement {
    }
    var HTMLAccountLoginElement: {
        prototype: HTMLAccountLoginElement;
        new (): HTMLAccountLoginElement;
    };
    interface HTMLAccountLogoutElement extends Components.AccountLogout, HTMLStencilElement {
    }
    var HTMLAccountLogoutElement: {
        prototype: HTMLAccountLogoutElement;
        new (): HTMLAccountLogoutElement;
    };
    interface HTMLAccountManagementElement extends Components.AccountManagement, HTMLStencilElement {
    }
    var HTMLAccountManagementElement: {
        prototype: HTMLAccountManagementElement;
        new (): HTMLAccountManagementElement;
    };
    interface HTMLAccountOobElement extends Components.AccountOob, HTMLStencilElement {
    }
    var HTMLAccountOobElement: {
        prototype: HTMLAccountOobElement;
        new (): HTMLAccountOobElement;
    };
    interface HTMLAccountPlanElement extends Components.AccountPlan, HTMLStencilElement {
    }
    var HTMLAccountPlanElement: {
        prototype: HTMLAccountPlanElement;
        new (): HTMLAccountPlanElement;
    };
    interface HTMLAccountRecoverEmailElement extends Components.AccountRecoverEmail, HTMLStencilElement {
    }
    var HTMLAccountRecoverEmailElement: {
        prototype: HTMLAccountRecoverEmailElement;
        new (): HTMLAccountRecoverEmailElement;
    };
    interface HTMLAccountResetPasswordElement extends Components.AccountResetPassword, HTMLStencilElement {
    }
    var HTMLAccountResetPasswordElement: {
        prototype: HTMLAccountResetPasswordElement;
        new (): HTMLAccountResetPasswordElement;
    };
    interface HTMLAccountUpdatePasswordElement extends Components.AccountUpdatePassword, HTMLStencilElement {
    }
    var HTMLAccountUpdatePasswordElement: {
        prototype: HTMLAccountUpdatePasswordElement;
        new (): HTMLAccountUpdatePasswordElement;
    };
    interface HTMLAccountVerifyElement extends Components.AccountVerify, HTMLStencilElement {
    }
    var HTMLAccountVerifyElement: {
        prototype: HTMLAccountVerifyElement;
        new (): HTMLAccountVerifyElement;
    };
    interface HTMLAccountWebhookElement extends Components.AccountWebhook, HTMLStencilElement {
    }
    var HTMLAccountWebhookElement: {
        prototype: HTMLAccountWebhookElement;
        new (): HTMLAccountWebhookElement;
    };
    interface HTMLApiDocsElement extends Components.ApiDocs, HTMLStencilElement {
    }
    var HTMLApiDocsElement: {
        prototype: HTMLApiDocsElement;
        new (): HTMLApiDocsElement;
    };
    interface HTMLAppBrokenElement extends Components.AppBroken, HTMLStencilElement {
    }
    var HTMLAppBrokenElement: {
        prototype: HTMLAppBrokenElement;
        new (): HTMLAppBrokenElement;
    };
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLContactUsElement extends Components.ContactUs, HTMLStencilElement {
    }
    var HTMLContactUsElement: {
        prototype: HTMLContactUsElement;
        new (): HTMLContactUsElement;
    };
    interface HTMLFeatureAddElement extends Components.FeatureAdd, HTMLStencilElement {
    }
    var HTMLFeatureAddElement: {
        prototype: HTMLFeatureAddElement;
        new (): HTMLFeatureAddElement;
    };
    interface HTMLFeatureDeleteElement extends Components.FeatureDelete, HTMLStencilElement {
    }
    var HTMLFeatureDeleteElement: {
        prototype: HTMLFeatureDeleteElement;
        new (): HTMLFeatureDeleteElement;
    };
    interface HTMLFeatureEditElement extends Components.FeatureEdit, HTMLStencilElement {
    }
    var HTMLFeatureEditElement: {
        prototype: HTMLFeatureEditElement;
        new (): HTMLFeatureEditElement;
    };
    interface HTMLFeatureToggleElement extends Components.FeatureToggle, HTMLStencilElement {
    }
    var HTMLFeatureToggleElement: {
        prototype: HTMLFeatureToggleElement;
        new (): HTMLFeatureToggleElement;
    };
    interface HTMLHomePageElement extends Components.HomePage, HTMLStencilElement {
    }
    var HTMLHomePageElement: {
        prototype: HTMLHomePageElement;
        new (): HTMLHomePageElement;
    };
    interface HTMLHowToUseElement extends Components.HowToUse, HTMLStencilElement {
    }
    var HTMLHowToUseElement: {
        prototype: HTMLHowToUseElement;
        new (): HTMLHowToUseElement;
    };
    interface HTMLLoadingStatusElement extends Components.LoadingStatus, HTMLStencilElement {
    }
    var HTMLLoadingStatusElement: {
        prototype: HTMLLoadingStatusElement;
        new (): HTMLLoadingStatusElement;
    };
    interface HTMLNavPageElement extends Components.NavPage, HTMLStencilElement {
    }
    var HTMLNavPageElement: {
        prototype: HTMLNavPageElement;
        new (): HTMLNavPageElement;
    };
    interface HTMLPageNotFoundElement extends Components.PageNotFound, HTMLStencilElement {
    }
    var HTMLPageNotFoundElement: {
        prototype: HTMLPageNotFoundElement;
        new (): HTMLPageNotFoundElement;
    };
    interface HTMLPricingOverviewElement extends Components.PricingOverview, HTMLStencilElement {
    }
    var HTMLPricingOverviewElement: {
        prototype: HTMLPricingOverviewElement;
        new (): HTMLPricingOverviewElement;
    };
    interface HTMLElementTagNameMap {
        "account-add-environment": HTMLAccountAddEnvironmentElement;
        "account-change-email": HTMLAccountChangeEmailElement;
        "account-change-name": HTMLAccountChangeNameElement;
        "account-change-password": HTMLAccountChangePasswordElement;
        "account-complete": HTMLAccountCompleteElement;
        "account-dashboard": HTMLAccountDashboardElement;
        "account-delete": HTMLAccountDeleteElement;
        "account-delete-environment": HTMLAccountDeleteEnvironmentElement;
        "account-downgrade-plan": HTMLAccountDowngradePlanElement;
        "account-edit-environment": HTMLAccountEditEnvironmentElement;
        "account-environments": HTMLAccountEnvironmentsElement;
        "account-generate-key": HTMLAccountGenerateKeyElement;
        "account-join": HTMLAccountJoinElement;
        "account-login": HTMLAccountLoginElement;
        "account-logout": HTMLAccountLogoutElement;
        "account-management": HTMLAccountManagementElement;
        "account-oob": HTMLAccountOobElement;
        "account-plan": HTMLAccountPlanElement;
        "account-recover-email": HTMLAccountRecoverEmailElement;
        "account-reset-password": HTMLAccountResetPasswordElement;
        "account-update-password": HTMLAccountUpdatePasswordElement;
        "account-verify": HTMLAccountVerifyElement;
        "account-webhook": HTMLAccountWebhookElement;
        "api-docs": HTMLApiDocsElement;
        "app-broken": HTMLAppBrokenElement;
        "app-root": HTMLAppRootElement;
        "contact-us": HTMLContactUsElement;
        "feature-add": HTMLFeatureAddElement;
        "feature-delete": HTMLFeatureDeleteElement;
        "feature-edit": HTMLFeatureEditElement;
        "feature-toggle": HTMLFeatureToggleElement;
        "home-page": HTMLHomePageElement;
        "how-to-use": HTMLHowToUseElement;
        "loading-status": HTMLLoadingStatusElement;
        "nav-page": HTMLNavPageElement;
        "page-not-found": HTMLPageNotFoundElement;
        "pricing-overview": HTMLPricingOverviewElement;
    }
}
declare namespace LocalJSX {
    interface AccountAddEnvironment {
        "user"?: any;
    }
    interface AccountChangeEmail {
        "history"?: RouterHistory;
        "onProfileChange"?: (event: CustomEvent<any>) => void;
        "user"?: any;
    }
    interface AccountChangeName {
        "onProfileChange"?: (event: CustomEvent<any>) => void;
        "user"?: any;
    }
    interface AccountChangePassword {
        "user"?: any;
    }
    interface AccountComplete {
        "history"?: RouterHistory;
    }
    interface AccountDashboard {
        "history"?: RouterHistory;
    }
    interface AccountDelete {
        "history"?: RouterHistory;
        "user"?: any;
    }
    interface AccountDeleteEnvironment {
        "user"?: any;
    }
    interface AccountDowngradePlan {
        "user"?: any;
    }
    interface AccountEditEnvironment {
        "user"?: any;
    }
    interface AccountEnvironments {
        "history"?: RouterHistory;
    }
    interface AccountGenerateKey {
        "user"?: any;
    }
    interface AccountJoin {
        "history"?: RouterHistory;
    }
    interface AccountLogin {
        "history"?: RouterHistory;
    }
    interface AccountLogout {
    }
    interface AccountManagement {
        "history"?: RouterHistory;
    }
    interface AccountOob {
        "history"?: RouterHistory;
    }
    interface AccountPlan {
        "history"?: RouterHistory;
    }
    interface AccountRecoverEmail {
        "history"?: RouterHistory;
    }
    interface AccountResetPassword {
        "history"?: RouterHistory;
    }
    interface AccountUpdatePassword {
        "history"?: RouterHistory;
    }
    interface AccountVerify {
        "history"?: RouterHistory;
    }
    interface AccountWebhook {
        "user"?: any;
    }
    interface ApiDocs {
        "history"?: RouterHistory;
    }
    interface AppBroken {
    }
    interface AppRoot {
        "history"?: RouterHistory;
    }
    interface ContactUs {
        "history"?: RouterHistory;
    }
    interface FeatureAdd {
        "user"?: any;
    }
    interface FeatureDelete {
        "user"?: any;
    }
    interface FeatureEdit {
        "user"?: any;
    }
    interface FeatureToggle {
        "featureSnapshot"?: any;
        "selectedEnvironment"?: string;
        "user"?: any;
    }
    interface HomePage {
    }
    interface HowToUse {
        "apiKey"?: string;
    }
    interface LoadingStatus {
        "status"?: string;
    }
    interface NavPage {
        "history"?: RouterHistory;
    }
    interface PageNotFound {
    }
    interface PricingOverview {
        "onDowngrade"?: (event: CustomEvent<any>) => void;
        "onJoin"?: (event: CustomEvent<any>) => void;
        "onUpgrade"?: (event: CustomEvent<any>) => void;
        "plan"?: string;
    }
    interface IntrinsicElements {
        "account-add-environment": AccountAddEnvironment;
        "account-change-email": AccountChangeEmail;
        "account-change-name": AccountChangeName;
        "account-change-password": AccountChangePassword;
        "account-complete": AccountComplete;
        "account-dashboard": AccountDashboard;
        "account-delete": AccountDelete;
        "account-delete-environment": AccountDeleteEnvironment;
        "account-downgrade-plan": AccountDowngradePlan;
        "account-edit-environment": AccountEditEnvironment;
        "account-environments": AccountEnvironments;
        "account-generate-key": AccountGenerateKey;
        "account-join": AccountJoin;
        "account-login": AccountLogin;
        "account-logout": AccountLogout;
        "account-management": AccountManagement;
        "account-oob": AccountOob;
        "account-plan": AccountPlan;
        "account-recover-email": AccountRecoverEmail;
        "account-reset-password": AccountResetPassword;
        "account-update-password": AccountUpdatePassword;
        "account-verify": AccountVerify;
        "account-webhook": AccountWebhook;
        "api-docs": ApiDocs;
        "app-broken": AppBroken;
        "app-root": AppRoot;
        "contact-us": ContactUs;
        "feature-add": FeatureAdd;
        "feature-delete": FeatureDelete;
        "feature-edit": FeatureEdit;
        "feature-toggle": FeatureToggle;
        "home-page": HomePage;
        "how-to-use": HowToUse;
        "loading-status": LoadingStatus;
        "nav-page": NavPage;
        "page-not-found": PageNotFound;
        "pricing-overview": PricingOverview;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "account-add-environment": LocalJSX.AccountAddEnvironment & JSXBase.HTMLAttributes<HTMLAccountAddEnvironmentElement>;
            "account-change-email": LocalJSX.AccountChangeEmail & JSXBase.HTMLAttributes<HTMLAccountChangeEmailElement>;
            "account-change-name": LocalJSX.AccountChangeName & JSXBase.HTMLAttributes<HTMLAccountChangeNameElement>;
            "account-change-password": LocalJSX.AccountChangePassword & JSXBase.HTMLAttributes<HTMLAccountChangePasswordElement>;
            "account-complete": LocalJSX.AccountComplete & JSXBase.HTMLAttributes<HTMLAccountCompleteElement>;
            "account-dashboard": LocalJSX.AccountDashboard & JSXBase.HTMLAttributes<HTMLAccountDashboardElement>;
            "account-delete": LocalJSX.AccountDelete & JSXBase.HTMLAttributes<HTMLAccountDeleteElement>;
            "account-delete-environment": LocalJSX.AccountDeleteEnvironment & JSXBase.HTMLAttributes<HTMLAccountDeleteEnvironmentElement>;
            "account-downgrade-plan": LocalJSX.AccountDowngradePlan & JSXBase.HTMLAttributes<HTMLAccountDowngradePlanElement>;
            "account-edit-environment": LocalJSX.AccountEditEnvironment & JSXBase.HTMLAttributes<HTMLAccountEditEnvironmentElement>;
            "account-environments": LocalJSX.AccountEnvironments & JSXBase.HTMLAttributes<HTMLAccountEnvironmentsElement>;
            "account-generate-key": LocalJSX.AccountGenerateKey & JSXBase.HTMLAttributes<HTMLAccountGenerateKeyElement>;
            "account-join": LocalJSX.AccountJoin & JSXBase.HTMLAttributes<HTMLAccountJoinElement>;
            "account-login": LocalJSX.AccountLogin & JSXBase.HTMLAttributes<HTMLAccountLoginElement>;
            "account-logout": LocalJSX.AccountLogout & JSXBase.HTMLAttributes<HTMLAccountLogoutElement>;
            "account-management": LocalJSX.AccountManagement & JSXBase.HTMLAttributes<HTMLAccountManagementElement>;
            "account-oob": LocalJSX.AccountOob & JSXBase.HTMLAttributes<HTMLAccountOobElement>;
            "account-plan": LocalJSX.AccountPlan & JSXBase.HTMLAttributes<HTMLAccountPlanElement>;
            "account-recover-email": LocalJSX.AccountRecoverEmail & JSXBase.HTMLAttributes<HTMLAccountRecoverEmailElement>;
            "account-reset-password": LocalJSX.AccountResetPassword & JSXBase.HTMLAttributes<HTMLAccountResetPasswordElement>;
            "account-update-password": LocalJSX.AccountUpdatePassword & JSXBase.HTMLAttributes<HTMLAccountUpdatePasswordElement>;
            "account-verify": LocalJSX.AccountVerify & JSXBase.HTMLAttributes<HTMLAccountVerifyElement>;
            "account-webhook": LocalJSX.AccountWebhook & JSXBase.HTMLAttributes<HTMLAccountWebhookElement>;
            "api-docs": LocalJSX.ApiDocs & JSXBase.HTMLAttributes<HTMLApiDocsElement>;
            "app-broken": LocalJSX.AppBroken & JSXBase.HTMLAttributes<HTMLAppBrokenElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "contact-us": LocalJSX.ContactUs & JSXBase.HTMLAttributes<HTMLContactUsElement>;
            "feature-add": LocalJSX.FeatureAdd & JSXBase.HTMLAttributes<HTMLFeatureAddElement>;
            "feature-delete": LocalJSX.FeatureDelete & JSXBase.HTMLAttributes<HTMLFeatureDeleteElement>;
            "feature-edit": LocalJSX.FeatureEdit & JSXBase.HTMLAttributes<HTMLFeatureEditElement>;
            "feature-toggle": LocalJSX.FeatureToggle & JSXBase.HTMLAttributes<HTMLFeatureToggleElement>;
            "home-page": LocalJSX.HomePage & JSXBase.HTMLAttributes<HTMLHomePageElement>;
            "how-to-use": LocalJSX.HowToUse & JSXBase.HTMLAttributes<HTMLHowToUseElement>;
            "loading-status": LocalJSX.LoadingStatus & JSXBase.HTMLAttributes<HTMLLoadingStatusElement>;
            "nav-page": LocalJSX.NavPage & JSXBase.HTMLAttributes<HTMLNavPageElement>;
            "page-not-found": LocalJSX.PageNotFound & JSXBase.HTMLAttributes<HTMLPageNotFoundElement>;
            "pricing-overview": LocalJSX.PricingOverview & JSXBase.HTMLAttributes<HTMLPricingOverviewElement>;
        }
    }
}
