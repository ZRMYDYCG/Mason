# Changelog

All notable changes to Mason are documented here.

This changelog is generated from the project commit history and organized by release scope.

## [Unreleased] - 2026-09-13

### Added

- Added public landing pages and assets, including header, hero, tech stack, detail, open-source and footer sections.
- Added MDX support for project documentation, including MDX compilation, Vue component rendering and documentation routes.
- Added documentation center pages, sample MDX content and reusable documentation components.
- Added component documentation page and public route for project component examples.
- Added dashboard modules and visual assets, with updated mock data for the dashboard API.
- Added `AsideUtility` and `BrandCard` to improve layout utility and brand display.
- Added table-style icon selection with pagination and copy support.
- Added `VITE_MOCK` environment switch for development and production mock data.

### Changed

- Migrated dual-menu layout into a hybrid layout experience.
- Updated logo implementation to use wordmark image assets.
- Replaced SVG logos with PNG assets and refreshed favicon links.
- Improved layout spacing and dimensions for `AsideUtility`, `Logo` and `SubMenu`.
- Improved card style mode switching across dashboard cards.
- Improved submenu and icon component alignment.
- Refined ThemeDrawer visual hierarchy and settings layout.
- Enhanced README content, project description, resource links and quick-start guidance.

### Fixed

- Fixed numeric conversion issues in visualization components.
- Fixed loop count comparison in count-up rendering.

### Chores

- Upgraded TypeScript and related development dependencies.
- Updated Stylelint and editor recommendations.
- Removed obsolete signaling server implementation.
- Migrated the backend architecture toward the Nest-based main iteration branch.

## [1.0.9] - 2025-06-11

### Added

- Added v2 API support.
- Added CLI foundation and helper commands for project scaffolding.
- Added CLI commands for route generation, component creation, file creation and code statistics.

### Changed

- Updated project documentation and README resources.
- Renamed and organized repository-facing CLI structure.

## [1.0.8] - 2025-05-12

### Added

- Added internationalization solution.
- Added page reload action.
- Added frontend cache solution.

## [1.0.7] - 2025-05-05

### Added

- Added theme switching animation solution.
- Added MasonAI chat experience, including sidebar, welcome view, input box and chat detail container.
- Added SSE utilities and streaming response examples for model interaction.
- Added MasonAI API initialization.
- Added packaging prompt tooling.

### Changed

- Optimized full-screen loading behavior.
- Adjusted page padding rules for different page types.
- Updated README documentation.

## [1.0.6] - 2025-04-03

### Added

- Added data visualization screen modules and chart wrappers.
- Added device distribution and device alert modules.
- Added file upload preview and document online preview examples.
- Added mock data solution.
- Added `useResizable`, `useTable` and form-related hooks.
- Added ripple directive with custom ripple style support.
- Added on-demand chart integration.

### Changed

- Improved login success feedback.
- Optimized visualization page styling.

### Fixed

- Fixed undefined method reference in hooks.
- Fixed route registration handling for root-level and full-screen dynamic routes.

## [1.0.5] - 2025-03-29

### Added

- Added component instance hook utilities.
- Added pro-form initialization.
- Added dynamic form solution and step form solution.
- Added configurable table and Element Plus table wrapper.
- Added Toast usage examples.
- Added flow chart, camera integration and component scaffolding templates.
- Added project component/page/store scaffolding templates.

### Changed

- Updated initialization SQL and project description.
- Improved icon preview, remote monitor and flow chart usage experience.
- Optimized app startup flow.

### Fixed

- Fixed chart resize handling for animation configuration and container size changes.

## [1.0.4] - 2025-03-25

### Added

- Added rich text editor.
- Added notification announcements.
- Added system configuration templates.
- Added page partial reload.
- Added global watermark.
- Added color-weak mode.
- Added container width modes.
- Added multiple layout modes, including vertical, top, mixed and dual-column layouts.

### Changed

- Improved theme configuration and theme color switching logic.
- Adjusted light/dark mode behavior.
- Improved menu display styles and header presentation.
- Upgraded Vite and improved build configuration.

### Fixed

- Fixed menu icon placeholder issue.
- Fixed key binding issue that caused page transition failures.

## [1.0.3] - 2025-03-19

### Added

- Added configurable table usage template.
- Added table component with custom height and pagination support.
- Added list search and filter form components.

### Changed

- Adjusted base component directory structure.

## [1.0.2] - 2025-03-16

### Added

- Added component runtime preview.
- Added project documentation list and project activity sections.
- Added project icon preview and icon selection.
- Added image cropper.
- Added full-screen loading.
- Added statistics charts.
- Added resizable menu support.
- Added form generator foundation and right-side form property configuration.
- Added form control property configuration for color picker, date picker, input, input number, checkbox, radio, rate, slider, switch and time selectors.
- Added remote-loaded select configuration.

### Fixed

- Fixed breadcrumb logic and replaced the old dashboard with the workspace page.
- Temporarily fixed component auto-import handling for cascader configuration.

## [1.0.1] - 2025-03-09

### Added

- Added initial Mason release notes baseline.
- Added early SVG rendering support.
