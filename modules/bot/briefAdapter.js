export const briefAdapter = {
  format(lead, copy) {
    return [
      copy.briefTitle,
      `${copy.goalLabel}: ${lead.goal}`,
      `${copy.detailsLabel}: ${lead.details}`,
      `${copy.contactLabel}: ${lead.contact}`,
      `${copy.slotLabel}: ${lead.date} · ${lead.time} (${copy.timeZone})`
    ].join('\n');
  }
};
