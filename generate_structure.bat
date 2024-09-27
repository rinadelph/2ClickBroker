@echo off

:: Create main project directory
mkdir 2click-broker-lms
cd 2click-broker-lms

:: Create subdirectories
mkdir public\images public\fonts
mkdir src\app\api\listings\[id] src\app\api\listings\area
mkdir src\app\api\analytics\[id]
mkdir src\app\api\commission
mkdir src\app\api\auth\verify src\app\api\auth\token
mkdir src\app\api\subscriptions
mkdir src\app\api\webhooks\clerk src\app\api\webhooks\stripe
mkdir src\app\dashboard
mkdir src\app\listings\create src\app\listings\[id]\edit src\app\listings\[id]\commission
mkdir src\app\map\area-select
mkdir src\app\analytics\[id]
mkdir src\app\account\settings src\app\account\subscription
mkdir src\app\admin\users src\app\admin\settings
mkdir src\app\crm\[id]
mkdir src\app\sign-in\[[...sign-in]]
mkdir src\app\sign-up\[[...sign-up]]
mkdir src\app\verify-access
mkdir src\components\ui src\components\layout src\components\listings src\components\map src\components\analytics src\components\dashboard src\components\admin src\components\subscription src\components\crm src\components\common
mkdir src\hooks src\lib src\styles src\types src\config
mkdir prisma
mkdir scripts

:: Create empty files
type nul > .env
type nul > .gitignore
type nul > package.json
type nul > tsconfig.json
type nul > next.config.js
type nul > postcss.config.js
type nul > tailwind.config.js
type nul > middleware.ts
type nul > README.md
type nul > prisma\schema.prisma
type nul > public\images\logo.svg
type nul > src\app\layout.tsx
type nul > src\app\page.tsx
type nul > src\styles\globals.css
type nul > src\config\site.ts
type nul > src\config\dashboard.ts
type nul > src\config\subscription-tiers.ts
type nul > scripts\seed-database.ts

:: Create empty files for each component directory
for %%d in (ui layout listings map analytics dashboard admin subscription crm common) do (
    for %%f in (Button Input Select Checkbox Modal Dropdown Table Pagination Toast Navbar Sidebar Footer ListingCard ListingGrid ListingForm ListingDetails CommissionInfo TwoClickAccess MapView MapMarker AreaSelect ZipCodeSearch AnalyticsChart AnalyticsSummary ListingAnalytics DashboardSummary RecentListings QuickActions UserManagement SystemSettings PlanSelector UpgradePrompt ContactList ContactDetails SEO ErrorBoundary LoadingSpinner AccessVerification) do (
        type nul > src\components\%%d\%%f.tsx
    )
)

:: Create empty files for hooks
for %%f in (use-commission-token use-listings use-analytics use-map use-subscription use-access-verification) do (
    type nul > src\hooks\%%f.ts
)

:: Create empty files for lib
for %%f in (prisma auth api utils constants stripe geocoding) do (
    type nul > src\lib\%%f.ts
)

:: Create empty files for types
for %%f in (listing user analytics subscription index) do (
    type nul > src\types\%%f.ts
)

echo Project structure created successfully!