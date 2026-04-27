# Orbit Under Pressure

`Orbit Under Pressure` is a browser-based orbital debris explainer that starts from official NASA and ESA reporting, then layers a transparent educational projection model on top.

## What it does

- Uses a 2024 baseline informed by ESA's 2025 space environment reporting
- Splits low Earth orbit into altitude bands instead of treating LEO as one bucket
- Models launches, disposal compliance, passivation, active debris removal, and collision-cascade sensitivity
- Includes multiple audience views for the general public, policymakers, universities, and industry
- Puts explanation sections before the simulator so the page reads like a tutorial, not just a dashboard
- Shows both a projection chart and a rotating orbit visualization

## Important caveat

This is an educational simulator, not a mission-grade environment tool. It is meant to make assumptions visible and discussable, not replace NASA ORDEM, ESA MASTER, or operator conjunction analysis.

## How to open it

Open `index.html` in a browser.

## Best next upgrades

- Replace inferred band-share weights with machine-readable catalog data if you can access it
- Add uncertainty ranges or scenario envelopes instead of single-line projections
- Add downloadable citations and a short methods note for applications or portfolio use
- Calibrate the projection layer against additional historical snapshots instead of one baseline year
