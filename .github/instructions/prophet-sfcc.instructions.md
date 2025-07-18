---
applyTo: **
---

# SFCC Platform Copilot Instructions

## Architecture & Framework

- Platform: Salesforce Commerce Cloud (SFCC)
- Backend: Server-side JavaScript (SSJS) using SFCC APIs

## SFCC-Specific Patterns

### API Usage
- Require Pattern: Use `require('dw/...')` for SFCC APIs, `require('*/cartridge/...')` for cross-cartridge references
- Transaction Management: Wrap data modifications in `Transaction.wrap(function() {})` using `require('dw/system/Transaction')`
- Core API Packages: `dw/order` (BasketMgr, OrderMgr, PaymentMgr), `dw/customer` (CustomerMgr), `dw/catalog` (ProductMgr), `dw/system` (Logger, Site, HookMgr, Transaction), `dw/web` (Resource, URLUtils, FormField)
- Data Management: `dw/object` (CustomObjectMgr), `dw/util` (Collection, ArrayList, StringUtils), `dw/value` (Money, Quantity)
- Web Operations: `dw/web` (Resource, URLUtils, FormField), `dw/template` (ISML), `dw/experience` (PageMgr)
- Services: `dw/svc` (LocalServiceRegistry), `dw/net` (HTTP, FTP, WebDAV), `dw/io` (File operations)
- Security: `dw/crypto` (cryptographic operations), `dw/util/SecureEncoder` for XSS prevention
- Extensions: `dw/extensions/payments`, `dw/extensions/applepay`, `dw/extensions/facebook`
- Campaign: `dw/campaign` (PromotionMgr), `dw/suggest` (search suggestions)
- Error Handling: Use try/catch blocks; leverage `dw/system/Logger` for comprehensive error logging
- Hooks: `require('dw/system/HookMgr')` for OCAPI extensibility and custom business logic injection
- [SFCC Script API Documentation](https://salesforcecommercecloud.github.io/b2c-dev-doc/docs/current/scriptapi/html/index.html)


### Page Designer
- Structure: Page types in `cartridge/experience/pages/`, component types in `cartridge/experience/components/`
- Meta Definitions: JSON files define regions, attributes, and UI controls for components/pages
- Scripts: `.js` files with same name as meta file; must export `render(context)` function returning markup string
- Rendering: Use `PageMgr.renderPage(pageId, parameters)` and `PageMgr.renderRegion(regionId)` in ISML templates
- API Objects: `PageScriptContext` for pages, `ComponentScriptContext` for components
- Content Types: boolean, string, text, markup, image, file, product, category, enum, custom, cms_record
- Decorators: Pass custom decorator via `renderParameters.decorator` or use `DEFAULT_DECORATOR` fallback
- Dynamic Pages: Use aspect types for product/category binding; create in `cartridge/experience/aspects/`
- Localization: Resource bundles in `cartridge/templates/resources/experience/`
- Thumbnails: Images in `cartridge/static/default/images/experience/` for visual editor
- Caching: Pages cached based on visibility rules; use `response.setExpires()` for cache control
- [SFCC Page Designer Documentation](https://developer.salesforce.com/docs/commerce/b2c-commerce/guide/b2c-dev-for-page-designer.html)

#### Page Designer Components
- Components: `cartridge/experience_sources/components/`
- Pages: `cartridge/experience_sources/pages/`

### Forms
- XML definitions in `cartridge/forms/default/` (locale folders: `forms/[locale]/`)
- Use `server.getForm(formName)` to create JSON object, access via `pdict`
- Handle submission with `req.form`, clear with `form.clear()`
- Validation: `mandatory`, `regexp`, `max-length` attributes; `invalidateFormElement()` for custom
- Localization: Resource strings `${Resource.msg('key','forms',null)}` in `forms.properties`
- Data: `server.copyObjectToForm()` to prepopulate, `FormModel.copyFrom()` for transfer
- Security: CSRF protection with `csrfProtection.validateAjaxRequest`
- Use form definitions for server-side validation, simple HTML for client-side only
- [SFCC Forms Documentation](https://developer.salesforce.com/docs/commerce/b2c-commerce/guide/b2c-forms.html)

### Services
- Define services in `cartridge/scripts/services/` (definition of all services in `services.xml`)
- Use `LocalServiceRegistry.createService(serviceId, callbacks)` to create service instances
- Callbacks: `createRequest`, `parseResponse`, `execute` (SOAP), `mockCall`
- Error Handling: Check `result.error` and `result.errorMessage`; use `.setThrowOnError()` for exceptions
- [SFCC Services Documentation](https://developer.salesforce.com/docs/commerce/b2c-commerce/guide/b2c-webservices.html)


### Hooks
- Purpose: Extend Shopper API resources using Script API for custom validation, data modification, and response transformation
- Structure: `cartridge/scripts/hooks/` + `hooks.json` + `package.json` registration
- Setup: `package.json` → `"hooks": "path/to/hooks.json"` + BM registration
- Export: CommonJS `exports.beforePOST = function(basket, basketRequest) {}`

#### Hook Types & Execution
- before: Custom validation (e.g., address validation before processing)
- after: Data persistence/external calls within transaction (e.g., payment processor integration)
- modifyResponse: Transform response data (add/remove attributes, external system integration)
- Execution Order: GET requests support `before` + `modifyResponse`; state-changing methods (POST/PATCH/PUT/DELETE) add `after` hooks
- Transaction Handling: `after` hooks execute within database transactions; errors cause automatic rollback

#### Status Objects & Error Handling
- Return Status: Return `Status` object for flow control; `OK` continues processing, `ERROR` stops and returns HTTP 400
- Skip System Implementation: Hooks returning values skip system implementation and subsequent registered hooks
- Multiple Hooks: If no `Status` returned, multiple registered hooks execute including base implementation
- Error Responses: Uncaught exceptions return HTTP 500; circuit breaker returns HTTP 503 after excessive failures
- Data Sharing: Use `request.custom` to pass data between hooks in same request cycle

#### SCAPI vs OCAPI Compatibility
- Dual Support: Same hooks work for both SCAPI and OCAPI endpoints
- Detection: Use `request.isSCAPI()` to determine API framework for conditional logic
- Custom Parameters: Use `c_` prefixed query parameters for conditional behavior
- Custom Headers: Support `c_` prefixed headers for diagnostic purposes only (not for response logic)

#### Special Hooks & Features
- Calculate Hook: `dw.order.calculate` for custom basket calculation logic; implicitly called by many basket operations
- Site-Specific Hooks: Upload site-level cartridges; requires `siteId` parameter for invocation
- External Taxation: Support for external tax calculation with `taxMode = external` and `TaxMgr.applyExternalTax()`
- [SFCC Hooks Documentation](https://developer.salesforce.com/docs/commerce/commerce-api/guide/extensibility_via_hooks.html)

### Client-side Code
- JS: `cartridge/client/default/js/`
- SCSS: `cartridge/client/default/scss/`

### Backend (SSJS)
- Use SFCC API patterns and best practices
- Follow existing model-controller-template separation
- Implement proper error handling and logging
- always use `var` for variable declarations
- use JSDoc to specify types of variables and signatures

### Controllers
- Structure: Place in `cartridge/controllers/` using server module patterns
- Server Module: Use `server.get()`, `server.post()`, `server.replace()`, `server.extend()`, `server.append()`, `server.prepend()`
- Routes: URL format `Controller-Function` (e.g., `Cart-AddProduct`); routes handle storefront requests and create ViewModels
- Middleware Chain: Functions with `(req, res, next)` signature; use built-in middleware like `server.middleware.https`, `server.middleware.get/post`
- Extension Patterns: Use `server.extend(module.superModule)` then modify with `replace`, `append`, or `prepend` methods
- Request/Response: Access via `req`/`res` objects; use `res.render()`, `res.json()`, `res.setViewData()`, `res.redirect()`
- Error Handling: Use try/catch blocks; errors logged to `customerror_*` files; Error.js handles uncaught errors (default 410 status)
- Events: Listen to route lifecycle events: `route:Start`, `route:Step`, `route:BeforeComplete`, `route:Complete`, `route:Redirect`
- Caching: Apply cache middleware for performance; use `cache.applyDefaultCache` or custom cache periods
- CommonJS: Must conform to CommonJS module standard; use `require()` for imports (not ES6 import); export with `module.exports = server.exports()`
- [SFCC Controllers Documentation](https://developer.salesforce.com/docs/commerce/b2c-commerce/guide/b2c-working-with-controllers.html)

### Models
Place in `cartridge/models/` with proper inheritance

### Modules & require
- "~/" prefix: relative to current cartridge
- "*/" prefix: searches all site cartridges by SFCC cartridge path order
- module.superModule: finds same filename in next cartridge in path
- use tool to get current SFCC cartridge path
- don't usage of `require` in global scope (module level) unless next point applies
    - `require` is allowed for system modules (which start by `dw/`)
    - `require` is allowed for middlwares (`**/middleware/**`)
- place `require` statements inside functions or methods to avoid issues with performance


### Templates
- File Structure: Templates in `cartridge/templates/default/` and `cartridge/templates/{locale}/` hierarchy per cartridge
- ISML Syntax: HTML markup with ISML tags (`<isif>`, `<isloop>`, `<isset>`, `<isprint>`) and expressions (`${var}`)
- Content Definition: `<iscontent type="text/html" charset="UTF-8" compact="true"/>` for page setup and encoding
- Security: Use `<isprint value="${expression}"/>` for automatic HTML encoding; avoid `encoding="off"` to prevent XSS
- Decorators: `<isdecorate template="layout/page">` for template wrapping; `<isreplace/>` as content placeholder
- Includes: `<isinclude template="path/template"/>` for local includes; `<isinclude url="${URLUtils.url('Controller-Method')}"/>` for remote includes
- Modules: `<ismodule template="modules/example" attribute="value"/>` for reusable template components with custom attributes
- Conditionals: `<isif condition="${expression}">`, `<iselseif>`, `<iselse/>`, loops with `<isloop items="${array}" var="item">`
- Caching: `<iscache type="relative" hour="24"/>` for template-level caching; coordinate with controller caching strategies
- Localization: use `${Resource.msg()}` for localized strings
- [SFCC ISML Documentation](https://developer.salesforce.com/docs/commerce/b2c-commerce/guide/b2c-working-with-templates.html)
- Template Resolution: `template="path/to/template"` searches site cartridges by SFCC cartridges path order; looks for `<cartridge>/cartridge/templates/{locale}/(path).isml` then `default/(path).isml`
- use `<iselse/>` (without spaces)

### Log files
- Logger Pattern: Use `var Logger = require('dw/system/Logger').getLogger()` for custom logging (details in class dw.system.Logger)
- Log Levels: `debug`, `info`, `warn`, `error`, `fatal`; methods: `logger.debug()`, `logger.info()`, `logger.warn()`, `logger.error()`
- Log Types: System logs (debug, info, warn, error, fatal), Custom logs (customdebug, custominfo, customwarn, customerror, customfatal)
- Service Logs: Service communication logs in `service-[prefix]-[id]-[date].log` format when comm logs enabled
- [SFCC Log Files Documentation](https://developer.salesforce.com/docs/commerce/b2c-commerce/guide/b2c-log-files-overview.html)

