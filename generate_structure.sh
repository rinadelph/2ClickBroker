#!/bin/bash

# Create the main project directory
mkdir -p 2click-broker-lms

# Create the directory structure
mkdir -p 2click-broker-lms/{public/{images,fonts},src/{app/{api/{listings/{[id],area},analytics/[id],commission,auth/{verify,token},subscriptions,webhooks/{clerk,stripe}},dashboard,listings/{create,[id]/{edit,commission}},map/area-select,analytics/[id],account/{settings,subscription},admin/{users,settings},crm/[id],"sign-in/[[...sign-in]]","sign-up/[[...sign-up]]",verify-access},components/{ui,layout,listings,map,analytics,dashboard,admin,subscription,crm,common},hooks,lib,styles,types,config},prisma,scripts}

# Create root-level files
touch 2click-broker-lms/{.env,.gitignore,package.json,tsconfig.json,next.config.js,postcss.config.js,tailwind.config.js,middleware.ts,README.md}

# Create files in specific directories
touch 2click-broker-lms/prisma/schema.prisma
touch 2click-broker-lms/public/images/logo.svg
touch 2click-broker-lms/src/app/{layout.tsx,page.tsx}
touch 2click-broker-lms/src/styles/globals.css
touch 2click-broker-lms/src/config/{site.ts,dashboard.ts,subscription-tiers.ts}
touch 2click-broker-lms/scripts/seed-database.ts

# Create page.tsx files in app subdirectories
find 2click-broker-lms/src/app -type d -not -path "*/.*" | while read dir; do touch "$dir/page.tsx"; done

# Create route.ts files in api subdirectories
find 2click-broker-lms/src/app/api -type d -not -path "*/.*" | while read dir; do touch "$dir/route.ts"; done

# Create component files
for dir in ui layout listings map analytics dashboard admin subscription crm common; do
  for file in $(cat <<EOF
ui:Button Input Select Checkbox Modal Dropdown Table Pagination Toast
layout:Navbar Sidebar Footer
listings:ListingCard ListingGrid ListingForm ListingDetails CommissionInfo TwoClickAccess
map:MapView MapMarker AreaSelect ZipCodeSearch
analytics:AnalyticsChart AnalyticsSummary ListingAnalytics
dashboard:DashboardSummary RecentListings QuickActions
admin:UserManagement SystemSettings
subscription:PlanSelector UpgradePrompt
crm:ContactList ContactDetails
common:SEO ErrorBoundary LoadingSpinner AccessVerification
EOF
  | grep "^$dir:" | cut -d: -f2- | tr ' ' '\n'); do
    touch "2click-broker-lms/src/components/$dir/$file.tsx"
  done
done

# Create hook files
for file in use-commission-token use-listings use-analytics use-map use-subscription use-access-verification; do
  touch "2click-broker-lms/src/hooks/$file.ts"
done

# Create lib files
for file in prisma auth api utils constants stripe geocoding; do
  touch "2click-broker-lms/src/lib/$file.ts"
done

# Create type files
for file in listing user analytics subscription index; do
  touch "2click-broker-lms/src/types/$file.ts"
done

echo "Project structure created successfully!"