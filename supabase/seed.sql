insert into organizations (name, segment, industry, team_size, salesforce_products)
values
  ('Northstar SaaS', 'Enterprise', 'SaaS', 850, array['Service Cloud', 'Sales Cloud', 'Data Cloud']),
  ('BrightDesk Support', 'SMB', 'Customer Support Organizations', 72, array['Service Cloud', 'Experience Cloud'])
on conflict do nothing;

insert into prompt_templates (category, title, template, rating, use_cases, variables)
values
  ('Support Agents', 'Case triage summary', 'Summarize the customer issue, urgency, sentiment, and next best action using the case history: {{case_history}}', 4.8, array['Case triage', 'Escalation routing'], array['case_history']),
  ('Sales Agents', 'Opportunity risk review', 'Review opportunity {{opportunity_name}} and identify decision gaps, stakeholder risks, and recommended follow-up actions.', 4.6, array['Pipeline inspection', 'Deal coaching'], array['opportunity_name']),
  ('Business Analysis', 'Workflow automation brief', 'Convert this manual workflow into an Agentforce automation brief with inputs, actions, guardrails, and success metrics: {{workflow}}', 4.9, array['Process discovery', 'Automation design'], array['workflow'])
on conflict do nothing;
