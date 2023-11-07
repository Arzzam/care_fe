import { navigate } from "raviger";
import { lazy, useState } from "react";
import withScrolling from "react-dnd-scrolling";
import { useTranslation } from "react-i18next";

import CareIcon from "@/CAREUI/icons/CareIcon";
import { AdvancedFilterButton } from "@/CAREUI/interactive/FiltersSlideover";
import { RESOURCE_CHOICES } from "@/Common/constants";
import useFilters from "@/Common/hooks/useFilters";
import ButtonV2 from "@/Components/Common/components/ButtonV2";
import SwitchTabs from "@/Components/Common/components/SwitchTabs";
import { ExportButton } from "@/Components/Common/Export";
import BadgesList from "@/Components/Resource/BadgesList";
import { formatFilter } from "@/Components/Resource/Commons";
import ListFilter from "@/Components/Resource/ListFilter";
import ResourceBoard from "@/Components/Resource/ResourceBoard";
import { downloadResourceRequests } from "@/Redux/actions";

const Loading = lazy(() => import("../Common/Loading"));
const PageTitle = lazy(() => import("../Common/PageTitle"));
const ScrollingComponent = withScrolling("div");
const resourceStatusOptions = RESOURCE_CHOICES.map((obj) => obj.text);

const COMPLETED = ["COMPLETED", "REJECTED"];
const ACTIVE = resourceStatusOptions.filter((o) => !COMPLETED.includes(o));

export default function BoardView() {
  const { qParams, FilterBadges, advancedFilter } = useFilters({ limit: -1 });
  const [boardFilter, setBoardFilter] = useState(ACTIVE);
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false);
  const appliedFilters = formatFilter(qParams);
  const { t } = useTranslation();

  const onListViewBtnClick = () => {
    navigate("/resource/list", { query: qParams });
    localStorage.setItem("defaultResourceView", "list");
  };

  return (
    <div className="flex h-screen flex-col px-2 pb-2">
      <div className="flex w-full flex-col items-center justify-between lg:flex-row">
        <div className="w-1/3 lg:w-1/4">
          <PageTitle
            title="Resource"
            hideBack
            className="mx-3 md:mx-5"
            componentRight={
              <ExportButton
                action={() =>
                  downloadResourceRequests({ ...appliedFilters, csv: 1 })
                }
                filenamePrefix="resource_requests"
              />
            }
            breadcrumbs={false}
          />
        </div>

        <div className="flex w-full flex-col items-center justify-between gap-2 pt-2 lg:flex-row lg:gap-4">
          <div></div>
          <SwitchTabs
            tab1="Active"
            tab2="Completed"
            onClickTab1={() => setBoardFilter(ACTIVE)}
            onClickTab2={() => setBoardFilter(COMPLETED)}
            isTab2Active={boardFilter !== ACTIVE}
          />
          <div className="flex w-full flex-col gap-2 lg:mr-4 lg:w-fit lg:flex-row lg:gap-4">
            <ButtonV2 className="py-[11px]" onClick={onListViewBtnClick}>
              <CareIcon className="care-l-list-ul" />
              {t("list_view")}
            </ButtonV2>
            <AdvancedFilterButton
              onClick={() => advancedFilter.setShow(true)}
            />
          </div>
        </div>
      </div>

      <BadgesList {...{ appliedFilters, FilterBadges }} />
      <ScrollingComponent className="mt-4 flex flex-1 items-start overflow-x-scroll px-4 pb-2 @container">
        <div className="mt-4 flex flex-1 items-start overflow-x-scroll px-4 pb-2">
          {isLoading ? (
            <Loading />
          ) : (
            boardFilter.map((board) => (
              <ResourceBoard
                key={board}
                filterProp={qParams}
                board={board}
                formatFilter={formatFilter}
              />
            ))
          )}
        </div>
      </ScrollingComponent>
      <ListFilter {...advancedFilter} key={window.location.search} />
    </div>
  );
}
