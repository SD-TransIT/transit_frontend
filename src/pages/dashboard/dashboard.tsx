import React, { useEffect } from 'react';

import { embedDashboard } from '@superset-ui/embedded-sdk';

import PageBody from 'components/shared/PageBody';
import { sessionToken } from 'stores/reducers/tokenReducer';
import apiClient from 'utils/apiClient';

function DashboardPage() {
  const getRequest = async (url: string) => {
    const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
    const { data } = await apiClient.get(
      url,
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return data;
  };

  const changeIframeProperty = () => {
    const iFrame: HTMLElement = document.querySelectorAll('iframe')[0];
    iFrame.style.width = '1600px';
    iFrame.style.height = '800px';
  };

  useEffect(() => {
    embedDashboard({
      id: process.env.SUPERSET_EMBEDDED_ID as string,
      supersetDomain: process.env.SUPERSET_HOST as string,
      mountPoint: document.getElementById('containerId') as HTMLElement,
      fetchGuestToken: () => getRequest(
        `/api-superset/guest-token?embedded_id=${process.env.SUPERSET_EMBEDDED_ID}`,
      ),
      dashboardUiConfig: { hideTitle: true, hideChartControls: true },
    });
    changeIframeProperty();
    // changeSupersetButtonFilterProperty();
    // changeSupersetButtonClearProperty();
  }, []);

  return (
    <PageBody title="">
      <div id="containerId" />
    </PageBody>
  );
}

export default DashboardPage;
