function singleLine(value) {
  return String(value ?? '')
    .normalize('NFC')
    .replace(/[\u0000-\u001f\u007f-\u009f\u200b-\u200f\u202a-\u202e\u2060\u2066-\u2069\ufeff]/gu, ' ')
    .replace(/[\s\u2028\u2029]+/gu, ' ')
    .trim();
}

export const briefAdapter = {
  format(lead, copy) {
    return [
      copy.briefTitle,
      `${copy.goalLabel}: ${singleLine(lead.goal)}`,
      `${copy.detailsLabel}: ${singleLine(lead.details)}`,
      `${copy.contactLabel}: ${singleLine(lead.contact)}`,
      `${copy.slotLabel}: ${singleLine(lead.date)} · ${singleLine(lead.time)} (${copy.timeZone})`
    ].join('\n');
  }
};
