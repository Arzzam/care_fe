import HL7Monitor from "@/Components/Assets/AssetType/HL7Monitor";
import ONVIFCamera from "@/Components/Assets/AssetType/ONVIFCamera";
import Page from "@/Components/Common/components/Page";
import Loading from "@/Components/Common/Loading";
import routes from "@/Redux/api";
import useQuery from "@/Utils/request/useQuery";

interface AssetConfigureProps {
  assetId: string;
  facilityId: string;
}

const AssetConfigure = ({ assetId, facilityId }: AssetConfigureProps) => {
  const {
    data: asset,
    loading,
    refetch,
  } = useQuery(routes.getAsset, { pathParams: { external_id: assetId } });

  if (loading || !asset) {
    return <Loading />;
  }

  if (asset.asset_class === "HL7MONITOR") {
    return (
      <Page
        title={`Configure HL7 Monitor: ${asset.name}`}
        crumbsReplacements={{
          [facilityId]: { name: asset.location_object.facility.name },
          assets: { uri: `/assets?facility=${facilityId}` },
          [assetId]: { name: asset?.name },
        }}
        backUrl={`/facility/${facilityId}/assets/${assetId}`}
      >
        <HL7Monitor asset={asset} assetId={assetId} facilityId={facilityId} />
      </Page>
    );
  }

  if (asset.asset_class === "VENTILATOR") {
    return (
      <Page
        title={`Configure Ventilator: ${asset?.name}`}
        crumbsReplacements={{
          [facilityId]: { name: asset?.location_object.facility.name },
          assets: { uri: `/assets?facility=${facilityId}` },
          [assetId]: { name: asset?.name },
        }}
        backUrl={`/facility/${facilityId}/assets/${assetId}`}
      >
        <HL7Monitor asset={asset} assetId={assetId} facilityId={facilityId} />
      </Page>
    );
  }

  return (
    <Page
      title={`Configure ONVIF Camera: ${asset?.name}`}
      crumbsReplacements={{
        [facilityId]: { name: asset?.location_object.facility.name },
        assets: { uri: `/assets?facility=${facilityId}` },
        [assetId]: { name: asset?.name },
      }}
      backUrl={`/facility/${facilityId}/assets/${assetId}`}
    >
      <ONVIFCamera
        asset={asset}
        assetId={assetId}
        facilityId={facilityId}
        onUpdated={() => refetch()}
      />
    </Page>
  );
};

export default AssetConfigure;
