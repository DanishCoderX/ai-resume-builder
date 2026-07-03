// POST /api/pdf/generate
// Accepts HTML string, returns PDF buffer
const generatePDF = async (req, res) => {
  const { html, filename } = req.body;
  if (!html) return res.status(400).json({ message: 'HTML is required' });

  try {
    const puppeteer = require('puppeteer-core');

    // Try to find Chrome in common locations
    const executablePath =
      process.env.CHROME_PATH ||
      '/usr/bin/google-chrome' ||
      '/usr/bin/chromium-browser' ||
      '/usr/bin/chromium';

    const browser = await puppeteer.launch({
      executablePath,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      headless: true,
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdf = await page.pdf({
      format: 'A4',
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      printBackground: true,
    });

    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename || 'resume'}.pdf"`);
    res.send(pdf);
  } catch (err) {
    console.error('PDF generation error:', err.message);
    res.status(500).json({ message: 'PDF generation failed', error: err.message });
  }
};

module.exports = { generatePDF };