import { CheckIcon } from '@phosphor-icons/react/dist/csr/Check';
import { StatusTag } from '@/components/status-tag';
import { SectionIntro } from './SectionIntro';

const erpTools = ['Look up an order', 'Check stock levels', 'Create a quotation', 'Update a delivery date'];

const accessRows = [
  { agent: 'Support agent', erp: true, crm: true, email: true },
  { agent: 'Sales agent', erp: false, crm: true, email: true },
  { agent: 'Finance agent', erp: true, crm: false, email: false },
];

function Access({ granted }: { granted: boolean }) {
  return granted ? (
    <span className='inline-flex items-center gap-1.5 font-medium'>
      <CheckIcon aria-hidden='true' className='size-4' weight='bold' />
      Allowed
    </span>
  ) : (
    <span className='text-muted-foreground'>No access</span>
  );
}

export function ConnectorsSection() {
  return (
    <section id='connectors' className='bg-muted px-5 py-24 sm:px-8 sm:py-32'>
      <div className='mx-auto max-w-7xl'>
        <SectionIntro title='Connect the systems your business runs on.'>
          A connector brings a system’s tools to your agents, like your ERP, CRM, or inbox. Your company connects its own account once, and can disconnect it at any time.
        </SectionIntro>

        <div className='mt-14 grid gap-2.5 lg:grid-cols-[0.9fr_1.1fr]'>
          <article className='min-w-0 rounded-[1.75rem] bg-card p-6 sm:p-8'>
            <div className='flex items-start justify-between gap-4'>
              <div>
                <h3 className='text-lg font-semibold'>ERP connector</h3>
                <p className='mt-1 text-sm text-muted-foreground'>Connected by your operations team</p>
              </div>
              <StatusTag status='available' />
            </div>
            <p className='mt-8 text-sm font-medium text-muted-foreground'>Tools it gives your agents</p>
            <ul className='mt-3 divide-y divide-border border-y border-border'>
              {erpTools.map((tool) => (
                <li key={tool} className='py-3 text-sm'>{tool}</li>
              ))}
            </ul>
            <p className='mt-6 text-sm leading-relaxed text-muted-foreground'>
              Need a system we do not cover yet? Custom connectors are built with you during onboarding.
            </p>
          </article>

          <article className='min-w-0 rounded-[1.75rem] bg-card p-6 sm:p-8'>
            <div className='flex items-start justify-between gap-4'>
              <div>
                <h3 className='text-lg font-semibold'>Access per agent</h3>
                <p className='mt-1 text-sm text-muted-foreground'>Each agent only reaches the systems its job needs</p>
              </div>
              <StatusTag status='coming-soon' />
            </div>
            <div className='mt-8 overflow-x-auto'>
              <table className='w-full min-w-[26rem] text-left text-sm'>
                <thead>
                  <tr className='border-b border-border text-muted-foreground'>
                    <th scope='col' className='py-3 pr-4 font-medium'>Agent</th>
                    <th scope='col' className='py-3 pr-4 font-medium'>ERP</th>
                    <th scope='col' className='py-3 pr-4 font-medium'>CRM</th>
                    <th scope='col' className='py-3 font-medium'>Email</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-border'>
                  {accessRows.map(({ agent, erp, crm, email }) => (
                    <tr key={agent}>
                      <th scope='row' className='py-3.5 pr-4 font-medium'>{agent}</th>
                      <td className='py-3.5 pr-4'><Access granted={erp} /></td>
                      <td className='py-3.5 pr-4'><Access granted={crm} /></td>
                      <td className='py-3.5'><Access granted={email} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
