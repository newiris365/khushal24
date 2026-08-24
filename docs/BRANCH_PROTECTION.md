# IRIS 365 Branch Protection Guidelines

To protect the `main` branch against regressions and unverified code, enable standard Branch Protection in GitHub settings.

## Setup Instructions

1. Navigate to your repository on GitHub: `https://github.com/newiris365/khushal24`
2. Go to **Settings** > **Branches**.
3. Click **Add branch protection rule** (or edit existing rule for `main`).
4. Set **Branch name pattern** to `main`.
5. Check the following options:
   - [x] **Require a pull request before merging**
     - [x] **Require approvals** (Minimum: `1`)
   - [x] **Require status checks to pass before merging**
     - [x] **Require branches to be up to date before merging**
     - Search for and add status check: `Build & Verify Quality` (defined in `.github/workflows/ci.yml`)
   - [x] **Require conversation resolution before merging**
   - [x] **Do not allow bypassing the above settings**
6. Click **Save changes**.
