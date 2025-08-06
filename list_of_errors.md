# Build Error Log

## Stage 1: Backend `node backend/app.js`

```
/workspace/Workhouse/backend/app.js:34
const dashboardRoutes = require('./routes/dashboard');
      ^

SyntaxError: Identifier 'dashboardRoutes' has already been declared
    at wrapSafe (node:internal/modules/cjs/loader:1472:18)
    at Module._compile (node:internal/modules/cjs/loader:1501:20)
    at Module._extensions..js (node:internal/modules/cjs/loader:1613:10)
    at Module.load (node:internal/modules/cjs/loader:1275:32)
    at Module._load (node:internal/modules/cjs/loader:1096:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:164:12)
    at node:internal/main/run_main_module:28:49

Node.js v20.19.4
```

## Stage 2: Frontend build start

```
npm warn Unknown env config "http-proxy". This will stop working in the next major version of npm.

> frontend@1.0.0 build
> vite build

[33mThe CJS build of Vite's Node API is deprecated. See https://vite.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated for more details.[39m
vite v5.4.19 building for production...
```

## Stage 3: Frontend script references (1)

- `<script src="/config.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="utils/api.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="utils/api.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="context/AuthContext.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="nav/menu.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="components/FeatureCard.js"> in "/index.html" can't be bundled without type="module" attribute`

## Stage 4: Frontend script references (2)

- `<script src="components/TestimonialCarousel.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="components/PartnerLogos.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="components/TrustBadges.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/landing.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="components/widgets/user_count.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="components/widgets/quote.js"> in "/index.html" can't be bundled without type="module" attribute`

## Stage 5: Frontend script references (3)

- `<script src="views/home_page.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="utils/api.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="utils/api.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/home_page.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="components/FeatureCard.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="components/FileUpload.js"> in "/index.html" can't be bundled without type="module" attribute`

## Stage 6: Frontend script references (4)

- `<script src="components/ProgressIndicator.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/landing_page.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/login_page.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/liveFeed.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="components/FeedPost.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/dashboard.js"> in "/index.html" can't be bundled without type="module" attribute`

## Stage 7: Frontend script references (5)

- `<script src="views/home_dashboard.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/live_feed.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/signup_userinfo.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/signup_page.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/home_dashboard.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/cv_cover_letter_page.js"> in "/index.html" can't be bundled without type="module" attribute`

## Stage 8: Frontend script references (6)

- `<script src="utils/auth.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/auth.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/profile.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="components/ProfileHeader.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="components/AboutSection.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="components/ProfessionalDetails.js"> in "/index.html" can't be bundled without type="module" attribute`

## Stage 9: Frontend script references (7)

- `<script src="components/ActivityFeed.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/profile_page.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/profile_customization.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="utils/api.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/financial_media_setup.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="utils/date.js"> in "/index.html" can't be bundled without type="module" attribute`

## Stage 10: Frontend script references (8)

- `<script src="api/profile.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/resume.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/employment.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/profile_customization.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="utils/api.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/financial_media_setup.js"> in "/index.html" can't be bundled without type="module" attribute`

## Stage 11: Frontend script references (9)

- `<script src="api/communications.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="components/widgets/chat_widget.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/chat_inbox.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/employment_dashboard.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/interviews.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/profile_customization.js"> in "/index.html" can't be bundled without type="module" attribute`

## Stage 12: Frontend script references (10)

- `<script src="utils/api.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/financial_media_setup.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/communications.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="components/widgets/chat_widget.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/chat_inbox.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/application_interview_management.js"> in "/index.html" can't be bundled without type="module" attribute`

## Stage 13: Frontend script references (11)

- `<script src="views/virtual_interview.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/gigs.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/education.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/calendar.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/profile_customization.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="utils/api.js"> in "/index.html" can't be bundled without type="module" attribute`

## Stage 14: Frontend script references (12)

- `<script src="views/financial_media_setup.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/gigs.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/gig_creation.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/calendar_page.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/gigs_dashboard.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/opportunities.js"> in "/index.html" can't be bundled without type="module" attribute`

## Stage 15: Frontend script references (13)

- `<script src="components/OpportunityCard.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/opportunity_search.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="utils/startupProfile.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/startup_profile_plan.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/jobs.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/volunteering.js"> in "/index.html" can't be bundled without type="module" attribute`

## Stage 16: Frontend script references (14)

- `<script src="views/volunteering_dashboard.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/sessions.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/session_management.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/networking.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="components/SessionCard.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/networking_dashboard.js"> in "/index.html" can't be bundled without type="module" attribute`

## Stage 17: Frontend script references (15)

- `<script src="api/jobs.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="components/JobCard.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/job_listings.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/educationSchedule.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/schedule_calendar.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="app.js"> in "/index.html" can't be bundled without type="module" attribute`

## Stage 18: Frontend script references (16)

- `<script src="components/GigCard.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/gig_search.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/blog.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/blog_home.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/jobs.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/analytics.js"> in "/index.html" can't be bundled without type="module" attribute`

## Stage 19: Frontend script references (17)

- `<script src="components/StatCard.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/stats.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/stats_analytics.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/ads.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/classrooms.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="components/JobCard.js"> in "/index.html" can't be bundled without type="module" attribute`

## Stage 20: Frontend script references (18)

- `<script src="views/job_listings.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/connections.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/connection_management.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="app.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/content.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="components/ContentForm.js"> in "/index.html" can't be bundled without type="module" attribute`

## Stage 21: Frontend script references (19)

- `<script src="components/ContentList.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/content_manager.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/live_engagement_analytics.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/job_listings.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="pages/NetworkingSessions.jsx"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/progress.js"> in "/index.html" can't be bundled without type="module" attribute`

## Stage 22: Frontend script references (20)

- `<script src="pages/ProgressDashboard.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/opportunities.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/volunteer_opportunities.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/creator.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/creator_dashboard.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/contracts.js"> in "/index.html" can't be bundled without type="module" attribute`

## Stage 23: Frontend script references (remaining)

- `<script src="components/ProposalCard.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="components/InvoiceForm.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="pages/ProposalInvoiceManagement.jsx"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="pages/EducationDashboard.jsx"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/course_module_management.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="utils/currency.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="api/courses.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="views/course_purchase.js"> in "/index.html" can't be bundled without type="module" attribute`
- `<script src="app.js"> in "/index.html" can't be bundled without type="module" attribute`

## Stage 24: Build summary

```
transforming...
✓ 81 modules transformed.
x Build failed in 502ms
error during build:
```

## Stage 25: Esbuild error

```
[vite:esbuild] Transform failed with 1 error:
/workspace/Workhouse/frontend/src/pages/LoginPage.jsx:28:0: ERROR: Unexpected "}"
file: /workspace/Workhouse/frontend/src/pages/LoginPage.jsx:28:0

Unexpected "}"
26 |    useDisclosure,
27 |    Text
28 |  } from '@chakra-ui/react';
   |  ^
29 |  import { useNavigate } from 'react-router-dom';
30 |  import { useAuth } from '../context/AuthContext.jsx';

    at failureErrorWithLog (/workspace/Workhouse/frontend/node_modules/esbuild/lib/main.js:1472:15)
    at /workspace/Workhouse/frontend/node_modules/esbuild/lib/main.js:755:50
    at responseCallbacks.<computed> (/workspace/Workhouse/frontend/node_modules/esbuild/lib/main.js:622:9)
    at handleIncomingPacket (/workspace/Workhouse/frontend/node_modules/esbuild/lib/main.js:677:12)
    at Socket.readFromStdout (/workspace/Workhouse/frontend/node_modules/esbuild/lib/main.js:600:7)
    at Socket.emit (node:events:524:28)
    at addChunk (node:internal/streams/readable:561:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:512:3)
    at Readable.push (node:internal/streams/readable:392:5)
    at Pipe.onStreamRead (node:internal/stream_base_commons:191:23)
```
